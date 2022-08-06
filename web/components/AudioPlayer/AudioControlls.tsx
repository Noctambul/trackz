import { AudioContext, AudioContextInterface } from "context/AudioContext";
import { useContext } from "react";
import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";

export default function AudioControlls(): JSX.Element {
  const { isPlaying, play, pause, previous, next } = useContext(
    AudioContext
  ) as AudioContextInterface;

  return (
    <div className="flex items-center">
      <button className="hidden md:block" type="button" onClick={previous}>
        <IoPlaySkipBack className="fill-primary text-lg" />
      </button>
      <button type="button" className="mx-2" onClick={isPlaying ? pause : play}>
        {isPlaying ? (
          <IoPause className="fill-primary text-4xl md:text-2xl" />
        ) : (
          <IoPlay className="fill-primary text-4xl md:text-2xl " />
        )}
      </button>
      <button className="hidden md:block" type="button" onClick={next}>
        <IoPlaySkipForward className="fill-primary text-lg" />
      </button>
    </div>
  );
}
