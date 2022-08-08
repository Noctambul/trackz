import { AudioContext, AudioContextInterface } from "context/AudioContext";
import { useContext } from "react";
import { IconType } from "react-icons";
import {
  IoPauseSharp,
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySharp,
} from "react-icons/io5";

function IconBtn({
  Icon,
  ...props
}: {
  Icon: IconType;
  [x: string]: any;
}): JSX.Element {
  return (
    <button type="button" {...props}>
      <Icon className="fill-inherit text-3xl" />
    </button>
  );
}

export default function AudioControlls(): JSX.Element {
  const { isPlaying, play, pause, previous, next } = useContext(
    AudioContext
  ) as AudioContextInterface;

  return (
    <div className="mx-6 flex items-center space-x-6">
      <IconBtn
        Icon={IoPlayBackSharp}
        onClick={previous}
        className="hidden fill-subtext sm:block"
      />
      <IconBtn
        className=" fill-primary"
        onClick={isPlaying ? pause : play}
        Icon={isPlaying ? IoPauseSharp : IoPlaySharp}
      />
      {/* <button type="button" className="mx-2" onClick={isPlaying ? pause : play}>
        {isPlaying ? (
          <IoPause className="fill-primary text-4xl sm:text-2xl" />
        ) : (
          <IoPlay className="fill-primary text-4xl sm:text-2xl " />
        )}
      </button> */}
      <IconBtn
        Icon={IoPlayForwardSharp}
        onClick={next}
        className="hidden fill-subtext sm:block"
      />
    </div>
  );
}
