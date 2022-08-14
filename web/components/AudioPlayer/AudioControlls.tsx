import IconBtn from "components/uikit/IconButton";
import { useAudio } from "context/AudioContext";
import {
  TbPlayerPause,
  TbPlayerPlay,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
} from "react-icons/tb";

export default function AudioControlls(): JSX.Element {
  const { isPlaying, play, pause, toPreviousTrack, toNextTrack } = useAudio();

  return (
    <div className="mx-6 flex items-center space-x-6">
      <IconBtn
        Icon={TbPlayerSkipBack}
        onClick={toPreviousTrack}
        className="hidden fill-subtext text-3xl sm:block"
      />
      <IconBtn
        className="fill-primary stroke-primary text-3xl"
        onClick={() => (isPlaying ? pause : play)}
        Icon={isPlaying ? TbPlayerPause : TbPlayerPlay}
      />
      {/* <button type="button" className="mx-2" onClick={isPlaying ? pause : play}>
        {isPlaying ? (
          <IoPause className="fill-primary text-4xl sm:text-2xl" />
        ) : (
          <IoPlay className="fill-primary text-4xl sm:text-2xl " />
        )}
      </button> */}
      <IconBtn
        Icon={TbPlayerSkipForward}
        onClick={toNextTrack}
        className="hidden fill-subtext  text-3xl sm:block"
      />
    </div>
  );
}
