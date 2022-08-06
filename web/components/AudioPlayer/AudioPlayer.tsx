import { Flex } from "@chakra-ui/react";
import Trackz from "models/trackz";
import AudioInfo from "./AudiInfo";

type Props = {
  trackz: Trackz;
};

export default function AudioPlayer({ trackz }: Props): JSX.Element {
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(timeInSeconds % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : seconds;

    return `${returnMin}:${returnSec}`;
  };

  return (
    <Flex width={"100%"} color={"primary"}>
      <AudioInfo trackz={trackz} />
    </Flex>
  );
}
