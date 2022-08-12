import { useAudio } from "context/AudioContext";
import Trackz from "models/trackz";

interface Props {
  hideCurrentTime?: boolean;
  trackz: Trackz;
}

export default function ProgressBar({
  hideCurrentTime = false,
  trackz,
}: Props): JSX.Element {
  const { duration, currentTime } = useAudio();

  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secs % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : seconds;

    return `${returnMin}:${returnSec}`;
  };

  return (
    <div className="hidden w-full items-center justify-between sm:flex sm:shrink">
      {!hideCurrentTime && (
        <div className="text-xs text-gray-300">{formatTime(currentTime)}</div>
      )}
      <div
        className={`${
          hideCurrentTime ? "mr-3 ml-1" : "mx-3"
        } border-gray-300} h-0 w-full shrink rounded border`}
      />
      <div className="text-xs text-gray-300">{formatTime(trackz.duration)}</div>
    </div>
  );
}
