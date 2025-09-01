export type AutocompleteProps<T> = {
  label: string;
  value: T | null;
  onChange: (value: T | null) => void;
  fetchOptions: (query: string) => Promise<T[]>;
  getOptionLabel?: (option: T) => string;
  placeholder?: string;
};
