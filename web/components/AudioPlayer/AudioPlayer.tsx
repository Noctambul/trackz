import { useAudio } from "context/AudioContext";
import AudioTrackz from "models/AudioTrackz";
import AudioControlls from "./AudioControlls";
import ProgressBar from "./ProgressBar";
import TrackzInfos from "./TrackzInfos";
import Volume from "./Volume";

export default function AudioPlayer({
  trackz,
}: {
  trackz: AudioTrackz;
}): JSX.Element {
  const { trackProgress, duration, onSearch, onSearchEnd } = useAudio();

  return (
    <div
      className="flex h-full w-full items-center justify-around"
      aria-label="Audio Player"
    >
      <TrackzInfos trackz={trackz.metadata} />
      <AudioControlls />
      <ProgressBar
        progress={trackProgress}
        duration={duration}
        onSearch={onSearch}
        onSearchEnd={onSearchEnd}
      />
      <Volume />
    </div>
  );
}
