interface Props extends Omit<React.HTMLProps<HTMLInputElement>, "onChange"> {
  min?: number;
  max?: number;
  value?: number;
  label?: string;
  onChange?: (value: number) => void;
}

export default function Slider({
  min = 0,
  max = 100,
  value = 50,
  label,
  onChange,
  ...props
}: Props): JSX.Element {
  const customInput = (
    <div className="w-full">
      {label && (
        <label
          htmlFor="minmaxRange"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="cursor-pointer">
        <input
          id="minmaxRange"
          type="range"
          min={min}
          max={max}
          value={50}
          className="h-0.5 w-full cursor-pointer appearance-none rounded-lg bg-red-400"
          {...props}
        />
        <input id="test" min={0} max={100} value={50} />
      </div>
    </div>
  );

  return (
    <>
      <input
        className="h-1 w-full"
        type={"range"}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange?.(parseFloat(e.target.value))}
        {...props}
      />
    </>
  );
}
