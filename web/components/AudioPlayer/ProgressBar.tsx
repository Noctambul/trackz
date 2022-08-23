import Slider from "components/uikit/Slider";
import { useTime } from "hooks/useTime";

interface Props {
  /** The current progress in seconds */
  progress: number;
  /** The track duration in seconds */
  duration: number;
  disabled?: boolean;
  onSearch?: (seconds: number) => void;
  onSearchEnd?: () => void;
}

export default function ProgressBar({
  progress,
  duration,
  disabled,
  onSearch,
  onSearchEnd,
}: Props): JSX.Element {
  const { formatTime } = useTime();

  // const progressElt = (
  //   <div
  //     className={`"mx-3" h-0 w-full shrink rounded border border-gray-300`}
  //   />
  // );

  const inputElt = (
    <Slider
      min={0}
      max={duration}
      value={progress}
      disabled={disabled}
      onChange={(value) => onSearch?.(value)}
      onMouseUp={onSearchEnd}
      onTouchEnd={onSearchEnd}
      className="mx-2 px-2"
    />
  );

  // TODO: Progress bar should be a real progress bar and we should use a slider otherwise

  return (
    <>
      <div className="hidden w-full items-center justify-between sm:flex sm:shrink">
        <div className="text-xs text-gray-300">{formatTime(progress)}</div>
        {inputElt}
        <div className="text-xs text-gray-300" aria-label="Duration">
          {formatTime(duration)}
        </div>
      </div>
    </>
  );
}
