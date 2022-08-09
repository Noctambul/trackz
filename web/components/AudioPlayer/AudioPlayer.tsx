import { useIpfs } from "hooks/useIpfs";
import Trackz from "models/trackz";
import AudioControlls from "./AudioControlls";
import ProgressBar from "./ProgressBar";
import TrackzInfos from "./TrackzInfos";

export default function AudioPlayer({
  trackz,
}: {
  trackz: Trackz;
}): JSX.Element {
  const { resolveLink } = useIpfs();

  return (
    <div className="flex h-full w-full items-center justify-around">
      <TrackzInfos trackz={trackz} />
      <AudioControlls />
      <ProgressBar />
    </div>
  );
}
