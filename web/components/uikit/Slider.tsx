interface Props extends React.HTMLProps<HTMLInputElement> {
  min?: number;
  max?: number;
  value?: number;
  label?: string;
}

export default function Slider({
  min = 0,
  max = 100,
  value = 0,
  label,
  ...props
}: Props): JSX.Element {
  return (
    <div className="relative pt-1">
      {label && (
        <label
          htmlFor="minmaxRange"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        id="minmaxRange"
        type="range"
        min={min}
        max={max}
        className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        {...props}
      />
    </div>
  );
}
