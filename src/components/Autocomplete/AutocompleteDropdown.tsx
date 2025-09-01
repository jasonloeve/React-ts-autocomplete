import { AutocompleteOption } from './AutocompleteOption';
import * as styles from './Autocomplete.module.css';

interface AutocompleteDropdownProps<T> {
  options: T[];
  loading: boolean;
  highlightedIndex: number;
  onSelect: (option: T) => void;
  setHighlightedIndex: (index: number) => void;
  getOptionLabel?: (option: T) => string;
  inputValue: string;
}

export function AutocompleteDropdown<T>({
  options,
  loading,
  highlightedIndex,
  onSelect,
  setHighlightedIndex,
  getOptionLabel = (o: any) => String(o),
  inputValue,
}: AutocompleteDropdownProps<T>) {
  return (
    <ul className={styles.dropdown} role="listbox">
      {loading ? (
        <li className={styles.loading} role="option" aria-disabled="true">
          Loading...
        </li>
      ) : options.length === 0 ? (
        <li className={styles.noResults} role="option" aria-disabled="true">
          No results for "{inputValue}"
        </li>
      ) : (
        options.map((option, index) => (
          <AutocompleteOption
            key={index}
            option={option}
            highlighted={index === highlightedIndex}
            onSelect={onSelect}
            onHover={() => setHighlightedIndex(index)}
            getOptionLabel={getOptionLabel}
            role="option"
            aria-selected={index === highlightedIndex}
          />
        ))
      )}
    </ul>
  );
}
