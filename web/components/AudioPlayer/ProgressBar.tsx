import Slider from "components/uikit/Slider";
import { useAudio } from "context/AudioContext";

interface Props {
  hideCurrentTime?: boolean;
}

export default function ProgressBar({
  hideCurrentTime = false,
}: Props): JSX.Element {
  const { duration, currentTime } = useAudio();

  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secs % 60);
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

  const inputElt = <Slider min={0} max={duration} value={currentTime} />;

  return (
    <div className="hidden w-full items-center justify-between sm:flex sm:shrink">
      YA QQUN
      {!hideCurrentTime && (
        <div className="text-xs text-gray-300">{formatTime(currentTime)}</div>
      )}
      ALLOW
      {progressElt}
      <div className="text-xs text-gray-300">{formatTime(duration)}</div>
    </div>
  );
}
