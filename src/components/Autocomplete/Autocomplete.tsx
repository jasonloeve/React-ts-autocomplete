import { type KeyboardEvent } from 'react';
import { AutocompleteInput } from './AutocompleteInput';
import { AutocompleteDropdown } from './AutocompleteDropdown';
import { useAutocomplete } from './useAutocomplete';
import { AutocompleteProps } from './autocomplete.types';
import * as styles from './Autocomplete.module.css';

export function Autocomplete<T>({
  label,
  value,
  onChange,
  fetchOptions,
  getOptionLabel = (o: T) => String(o),
  placeholder = "",
}: AutocompleteProps<T>) {
  const {
    inputValue,
    setInputValue,
    options,
    loading,
    showDropdown,
    setShowDropdown,
    highlightedIndex,
    setHighlightedIndex,
    handleSelect,
  } = useAutocomplete({label, value, onChange, fetchOptions, getOptionLabel, placeholder});

  // @NOTE - Look into creating helper
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelect(options[highlightedIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div
      className={styles.container}
      role="combobox"
      aria-expanded={showDropdown}
      aria-haspopup="listbox"
    >
      <AutocompleteInput
        value={inputValue}
        onChange={setInputValue}
        onFocus={() => inputValue.trim() && setShowDropdown(true)}
        onKeyDown={handleKeyDown}
        label={label}
        placeholder={placeholder}
        onClear={() => {
          setInputValue("");
          onChange(null);
          setShowDropdown(false);
        }}
      />
      {showDropdown && (
        <AutocompleteDropdown
          options={options}
          loading={loading}
          highlightedIndex={highlightedIndex}
          onSelect={handleSelect}
          setHighlightedIndex={setHighlightedIndex}
          getOptionLabel={getOptionLabel}
          inputValue={inputValue}
        />
      )}
    </div>
  );
}
