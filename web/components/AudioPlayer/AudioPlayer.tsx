import { useIpfs } from "hooks/useIpfs";
import Trackz from "models/trackz";
import AudioControlls from "./AudioControlls";
import TrackzInfos from "./TrackzInfos";

export default function AudioPlayer({
  trackz,
}: {
  trackz: Trackz;
}): JSX.Element {
  const { resolveLink } = useIpfs();

  const minSec = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secs % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : seconds;

    return `${returnMin}:${returnSec}`;
  };

  return (
    <div className="flex h-full w-full items-center justify-around">
      <TrackzInfos trackz={trackz} />
      <AudioControlls />
    </div>
  );
}
