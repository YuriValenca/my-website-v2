import { Chip, ChipList } from "./style";

interface ChipOption<T> {
  value: T;
  label: string;
}

interface ChipSelectProps<T extends string | number> {
  options: ChipOption<T>[];
  selected: T[];
  onChange: (selected: T[]) => void;
}

const ChipSelect = <T extends string | number>({ options, selected, onChange }: ChipSelectProps<T>) => {
  const toggle = (value: T) =>
    onChange(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);

  return (
    <ChipList>
      {options.map(({ value, label }) => (
        <Chip
          key={value}
          isSelected={selected.includes(value)}
          aria-pressed={selected.includes(value)}
          onClick={() => toggle(value)}
        >
          {label}
        </Chip>
      ))}
    </ChipList>
  );
};

export default ChipSelect;
