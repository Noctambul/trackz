import { Flex } from "@chakra-ui/react";

export default function AudioPlayer(): JSX.Element {
  // const { resolveLink } = useIpfs();
  // const {
  //   isPlaying,
  //   trackProgress,
  //   duration,
  //   toggle,
  //   toPrevTrack,
  //   toNextTrack,
  //   onSearch,
  //   onSearchEnd,
  //   onVolume,
  //   currentSongMetadata,
  // } = useContext(AudioContext) as AudioContextInterface;

  const minSec = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secs % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : seconds;

    return `${returnMin}:${returnSec}`;
  };

  return (
    <Flex width={"100%"} color={"primary"}>
      Coucou
    </Flex>
  );
}
