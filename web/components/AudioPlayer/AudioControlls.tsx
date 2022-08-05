import { AudioContext, AudioContextInterface } from "context/AudioContext";
import { useContext } from "react";
import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";

const iconSize = 20;

export default function AudioControlls(): JSX.Element {
  const { isPlaying, play, pause, previous, next } = useContext(
    AudioContext
  ) as AudioContextInterface;

  return (
    <div className="flex items-center">
      <button type="button" onClick={previous}>
        <IoPlaySkipBack className="fill-primary" size={iconSize} />
      </button>
      <button type="button" className="mx-2" onClick={isPlaying ? pause : play}>
        {isPlaying ? (
          <IoPause className="fill-primary" size={iconSize} />
        ) : (
          <IoPlay className="fill-primary" size={iconSize} />
        )}
      </button>
      <button type="button" onClick={next}>
        <IoPlaySkipForward className="fill-primary" size={iconSize} />
      </button>
    </div>
  );
}
