import { SliderInput, SliderRail, SliderTrack, SliderValues, SliderWrapper } from "./style";

interface SliderRange {
  min: number;
  max: number;
}

interface RangeSliderProps {
  limits: SliderRange;
  value: SliderRange;
  step: number;
  label: string;
  onChange: (value: SliderRange) => void;
  formatValue?: (value: number) => string;
}

const toPercent = (value: number, { min, max }: SliderRange) => ((value - min) / (max - min)) * 100;

const RangeSlider = ({ limits, value, step, label, onChange, formatValue = String }: RangeSliderProps) => {
  const changeMin = (min: number) => onChange({ ...value, min: Math.min(min, value.max) });
  const changeMax = (max: number) => onChange({ ...value, max: Math.max(max, value.min) });

  return (
    <SliderWrapper>
      <SliderValues>{formatValue(value.min)} – {formatValue(value.max)}</SliderValues>
      <SliderTrack>
        <SliderRail fromPercent={toPercent(value.min, limits)} toPercent={toPercent(value.max, limits)} />
        <SliderInput
          type="range"
          aria-label={`Minimum ${label}`}
          min={limits.min}
          max={limits.max}
          step={step}
          value={value.min}
          onChange={(event) => changeMin(Number(event.target.value))}
        />
        <SliderInput
          type="range"
          aria-label={`Maximum ${label}`}
          min={limits.min}
          max={limits.max}
          step={step}
          value={value.max}
          onChange={(event) => changeMax(Number(event.target.value))}
        />
      </SliderTrack>
    </SliderWrapper>
  );
};

export default RangeSlider;
