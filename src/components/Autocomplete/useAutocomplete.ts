import { useState, useCallback, useEffect, useRef } from 'react';
import { useDebounce } from 'react-use';

export function useAutocomplete<T>({
  value,
  onChange,
  fetchOptions,
  getOptionLabel,
  debounceMs = 300,
}: {
  value: T | null;
  onChange: (val: T | null) => void;
  fetchOptions: (query: string) => Promise<T[]>;
  getOptionLabel: (o: T) => string;
  debounceMs?: number;
}) {
  const [inputValue, setInputValue] = useState(() => value ? getOptionLabel(value) : "");
  const [options, setOptions] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Avoid races between overlapping requests
  const fetchIdRef = useRef(0);
  // Suppress the next fetch when the input change comes from a selection
  const suppressNextFetchRef = useRef(false);

  // Keep input in sync if external value changes
  useEffect(() => {
    const label = value ? getOptionLabel(value) : "";
    if (label !== inputValue) setInputValue(label);
  }, [value, getOptionLabel]); // eslint-disable-line react-hooks/exhaustive-deps

  // @NOTE - I've used a debounce here for 3rd party services,
  // in high traffic sites this saves costs by not submitting
  // a request on each keystroke and helps stay within fair-use limits.
  useDebounce(
    () => {
      // Skip a single run if it was triggered by handleSelect
      if (suppressNextFetchRef.current) {
        suppressNextFetchRef.current = false;
        return;
      }

      if (inputValue.trim().length === 0) {
        setOptions([]);
        setShowDropdown(false);
        setHighlightedIndex(-1);
        onChange(null); // user cleared input
        return;
      }

      const fetchId = ++fetchIdRef.current;
      setShowDropdown(true);
      setLoading(true);

      fetchOptions(inputValue)
        .then((res) => {
          if (fetchId === fetchIdRef.current) {
            setOptions(res);
            setHighlightedIndex(res.length > 0 ? 0 : -1);
          }
        })
        .finally(() => {
          if (fetchId === fetchIdRef.current) {
            setLoading(false);
          }
        });
    },
    debounceMs,
    [inputValue]
  );

  const handleSelect = useCallback(
    (option: T) => {
      onChange(option);
      suppressNextFetchRef.current = true; // prevent the "selection" input update from triggering a new fetch
      setInputValue(getOptionLabel(option));
      setShowDropdown(false);
      setHighlightedIndex(-1);
    },
    [onChange, getOptionLabel]
  );

  return {
    inputValue,
    setInputValue,
    options,
    loading,
    showDropdown,
    setShowDropdown,
    highlightedIndex,
    setHighlightedIndex,
    handleSelect,
  };
}
