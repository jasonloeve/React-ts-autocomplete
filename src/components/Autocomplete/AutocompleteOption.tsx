import * as styles from './Autocomplete.module.css';

interface AutocompleteOptionProps<T> {
  option: T;
  highlighted: boolean;
  onSelect: (option: T) => void;
  onHover: () => void;
  getOptionLabel?: (option: T) => string;
}

export const AutocompleteOption = <T,>({
  option,
  highlighted,
  onSelect,
  onHover,
  getOptionLabel = (o: any) => String(o),
}: AutocompleteOptionProps<T>) => (
  <li
    role="option"
    aria-selected={highlighted}
    className={`${styles.option} ${highlighted ? styles.highlighted : ""}`} // @NOTE - Could make use of clsx
    onMouseDown={() => onSelect(option)}
    onClick={() => onSelect(option)}
    onMouseEnter={onHover}
  >
    {getOptionLabel(option)}
  </li>
);