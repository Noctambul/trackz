import { Flex, Icon } from "@chakra-ui/react";
import { AudioContext, AudioContextInterface } from "context/AudioContext";
import { useContext } from "react";
import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";

export default function AudioControls(): JSX.Element {
  const { isPlaying, play, pause, next, previous } = useContext(
    AudioContext
  ) as AudioContextInterface;
  const iconSize = 5;

  return (
    <Flex align={"center"}>
      <Icon
        aria-label="Previous track"
        cursor={"pointer"}
        boxSize={iconSize}
        onClick={previous}
        as={IoPlaySkipBack}
      />
      {isPlaying ? (
        <Icon
          mx={4}
          aria-label="Pause track"
          cursor={"pointer"}
          boxSize={iconSize + 1}
          onClick={pause}
          as={IoPause}
        />
      ) : (
        <Icon
          mx={4}
          aria-label="Play track"
          cursor={"pointer"}
          boxSize={iconSize + 1}
          onClick={play}
          as={IoPlay}
        />
      )}
      <Icon
        aria-label="Next track"
        cursor={"pointer"}
        onClick={next}
        boxSize={iconSize}
        as={IoPlaySkipForward}
      />
    </Flex>
  );
}
