import IconBtn from "components/uikit/IconButton";
import { useAudio } from "context/AudioContext";
import {
  TbPlayerPause,
  TbPlayerPlay,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
} from "react-icons/tb";

export default function AudioControlls(): JSX.Element {
  const {
    isPlaying,
    play,
    pause,
    toPreviousTrack,
    toNextTrack,
    canNext,
    canPrev,
  } = useAudio();

  return (
    <div className="mx-6 flex items-center space-x-6">
      <IconBtn
        Icon={TbPlayerSkipBack}
        onClick={toPreviousTrack}
        disabled={!canPrev}
        className={`hidden ${
          canPrev ? "fill-white" : "fill-gray-400"
        } text-3xl sm:block`}
        aria-label="Previous Track"
      />
      <IconBtn
        className="fill-white stroke-white text-3xl"
        onClick={() => (isPlaying ? pause() : play())}
        Icon={isPlaying ? TbPlayerPause : TbPlayerPlay}
        aria-label={isPlaying ? "Pause Track" : "Play Track"}
      />
      <IconBtn
        Icon={TbPlayerSkipForward}
        onClick={toNextTrack}
        className={`hidden ${
          canNext ? "fill-white" : "fill-gray-400"
        } text-3xl sm:block`}
        disabled={!canNext}
        aria-label="Next Track"
      />
    </div>
  );
}
