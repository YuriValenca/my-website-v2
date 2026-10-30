import { SegmentedOption, SegmentedWrapper } from "./style";

interface SegmentedControlProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

const SegmentedControl = <T extends string>({ label, options, value, onChange }: SegmentedControlProps<T>) => (
  <SegmentedWrapper role="group" aria-label={label}>
    {options.map((option) => (
      <SegmentedOption
        key={option.value}
        type="button"
        isActive={option.value === value}
        aria-pressed={option.value === value}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </SegmentedOption>
    ))}
  </SegmentedWrapper>
);

export default SegmentedControl;
