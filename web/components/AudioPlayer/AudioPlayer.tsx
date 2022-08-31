import AudioTrackz from "models/AudioTrackz";
import AudioControlls from "./AudioControlls";
import ProgressBar from "./ProgressBar";
import TrackzInfos from "./TrackzInfos";
import Volume from "./Volume";

interface AudioPlayerProps {
  trackz: AudioTrackz;
  trackProgress: number;
  duration: number;
  onSearch: (seconds: number) => void;
  onSearchEnd: () => void;
}

export default function AudioPlayer({
  trackz,
  trackProgress,
  duration,
  onSearch,
  onSearchEnd,
}: AudioPlayerProps): JSX.Element {
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
