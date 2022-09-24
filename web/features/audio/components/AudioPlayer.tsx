import { useAudio } from "features/audio/context/AudioContext";
import AudioTrackz from "models/AudioTrackz";
import AudioControlls from "./AudioControlls";
import Playlist from "./Playlist";
import ProgressBar from "./ProgressBar";
import TrackzInfos from "./TrackzInfos";
import Volume from "./Volume";

interface AudioPlayerProps {
  trackz: AudioTrackz;
  trackProgress: number;
  duration: number;
  onSearch: (seconds: number) => void;
  onSearchEnd: (seconds: number) => void;
}

export default function AudioPlayer({
  trackz,
  trackProgress,
  duration,
  onSearch,
  onSearchEnd,
}: AudioPlayerProps): JSX.Element {
  const { playlist, currentIndex, play, isPlaying, removeTrackz } = useAudio();

  return (
    <div
      className="z-50 flex h-full w-full items-center justify-around gap-6 text-text "
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
      <Playlist
        removeTrack={removeTrackz}
        playlist={playlist}
        currentTrackIndex={currentIndex}
        play={play}
        isPlaying={isPlaying}
      />
    </div>
  );
}
