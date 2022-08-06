import { AudioContext, AudioContextInterface } from "context/AudioContext";
import { useContext } from "react";

interface Props {}

export default function ProgressBar({}: Props): JSX.Element {
  const { duration, currentTime } = useContext(
    AudioContext
  ) as AudioContextInterface;

  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secs % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : seconds;

    return `${returnMin}:${returnSec}`;
  };

  return (
    <div className="hidden w-full max-w-lg items-center justify-between p-8 sm:flex">
      <div className="text-sm text-gray-300">{formatTime(currentTime)}</div>
      <div className="mx-3 h-0 w-full border border-gray-300" />
      <div className="text-sm text-gray-300">{formatTime(duration)}</div>
    </div>
  );
}
