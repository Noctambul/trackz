import Slider from "components/uikit/Slider";

interface Props {
  /** The current progress in seconds */
  progress: number;
  /** The track duration in seconds */
  duration: number;
  disabled?: boolean;
  hideCurrentTime?: boolean;
  onSearch?: (seconds: number) => void;
  onSearchEnd?: () => void;
}

export default function ProgressBar({
  progress,
  duration,
  onSearch,
  onSearchEnd,
  hideCurrentTime = false,
}: Props): JSX.Element {
  /**
   * @param timeInSeconds The time to format in seconds
   */
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(timeInSeconds % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : seconds;

    return `${returnMin}:${returnSec}`;
  };

  const progressElt = (
    <div
      className={`${
        hideCurrentTime ? "mr-3 ml-1" : "mx-3"
      } border-gray-300} h-0 w-full shrink rounded border`}
    />
  );

  const inputElt = (
    <Slider
      min={0}
      max={duration}
      value={progress}
      disabled
      // TODO: onChange should directly return the value, not the event
      // onChange={(value) => onSearch?.(value)}
    />
  );

  return (
    <div className="hidden w-full items-center justify-between sm:flex sm:shrink">
      {!hideCurrentTime && (
        <div className="text-xs text-gray-300">{formatTime(progress)}</div>
      )}
      {inputElt}
      <div className="text-xs text-gray-300">{formatTime(duration)}</div>
    </div>
  );
}
