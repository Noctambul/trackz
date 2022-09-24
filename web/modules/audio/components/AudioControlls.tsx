// import IconBtn from "components/uikit/IconButton";
import IconBtn from "components/uikit/IconButton";
import { useAudio } from "modules/audio/context/AudioContext";
import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";
import { TbPlayerSkipBack, TbPlayerSkipForward } from "react-icons/tb";

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
    <div className="flex items-center sm:space-x-6">
      <IconBtn
        Icon={TbPlayerSkipBack}
        onClick={toPreviousTrack}
        disabled={!canPrev}
        className={`hidden ${
          canPrev ? "fill-text" : "fill-lightgray"
        } text-2xl sm:block`}
        aria-label="Previous Track"
      />
      <IconBtn
        className="fill-text stroke-text text-4xl"
        onClick={() => (isPlaying ? pause() : play())}
        Icon={isPlaying ? IoPauseCircleOutline : IoPlayCircleOutline}
        aria-label={isPlaying ? "Pause Track" : "Play Track"}
      />
      <IconBtn
        Icon={TbPlayerSkipForward}
        onClick={toNextTrack}
        className={`hidden ${
          canNext ? "fill-text" : "fill-lightgray"
        } text-2xl sm:block`}
        disabled={!canNext}
        aria-label="Next Track"
      />
    </div>
  );
}
