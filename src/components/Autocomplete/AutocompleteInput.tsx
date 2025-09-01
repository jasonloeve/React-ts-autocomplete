import { type KeyboardEvent } from 'react';
import { IconSearch, IconClose } from '../Icons.tsx';
import * as styles from './Autocomplete.module.css';

interface AutocompleteInputProps {
  value: string;
  onChange: (val: string) => void;
  onFocus?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  onClear?: () => void;
}

export const AutocompleteInput = ({
  value,
  onChange,
  onFocus,
  onKeyDown,
  label,
  placeholder = "",
  onClear,
}: AutocompleteInputProps) => {
  const inputId = `autocomplete-input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={styles.holder}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={inputId}
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
        <div className={styles.suffix}>
          {value && onClear && (
            <button
              type="button"
              className={styles.clear}
              onClick={onClear}
              aria-label="Clear input"
            >
              <IconClose width="8" height="8" fill="#9F9F9F" />
            </button>
          )}
          <IconSearch
            width="12"
            height="12"
            fill="#9F9F9F"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
