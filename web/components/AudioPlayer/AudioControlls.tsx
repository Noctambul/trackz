// import IconBtn from "components/uikit/IconButton";
import IconBtn from "components/uikit/IconButton";
import { useAudio } from "context/AudioContext";
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
      {/* <IconButton
        aria-label="Previous track"
        icon={<TbPlayerSkipBack />}
        onClick={toPreviousTrack}
        disabled={!canPrev}
        variant="unstyled"
      />
      <IconButton
        className="fill-white text-9xl"
        aria-label={isPlaying ? "Pause track" : "Play track"}
        icon={isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
        onClick={() => (isPlaying ? pause() : play())}
        variant="unstyled"
        size="lg"
        fill="white"
      />
      <IconButton
        aria-label="Next track"
        icon={<TbPlayerSkipForward />}
        disabled={!canNext}
        onClick={toNextTrack}
        variant="unstyled"
      /> */}

      <IconBtn
        Icon={TbPlayerSkipBack}
        onClick={toPreviousTrack}
        disabled={!canPrev}
        className={`hidden ${
          canPrev ? "fill-white" : "fill-lightgray"
        } text-2xl sm:block`}
        aria-label="Previous Track"
      />
      <IconBtn
        className="fill-white stroke-white text-4xl"
        onClick={() => (isPlaying ? pause() : play())}
        Icon={isPlaying ? IoPauseCircleOutline : IoPlayCircleOutline}
        aria-label={isPlaying ? "Pause Track" : "Play Track"}
      />
      <IconBtn
        Icon={TbPlayerSkipForward}
        onClick={toNextTrack}
        className={`hidden ${
          canNext ? "fill-white" : "fill-lightgray"
        } text-2xl sm:block`}
        disabled={!canNext}
        aria-label="Next Track"
      />
    </div>
  );
}
