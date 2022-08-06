import { Box, Flex } from "@chakra-ui/react";
import { AudioContext, AudioContextInterface } from "context/AudioContext";
import { useContext } from "react";

export default function ProgressBar(): JSX.Element {
  const { duration, currentTime } = useContext(
    AudioContext
  ) as AudioContextInterface;

  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secs % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : seconds;

    return `${returnMin}:${returnSec}`;
  };

  return (
    <Flex
      w="full"
      maxW={"lg"}
      alignItems="center"
      justifyContent={"space-between"}
      p="2"
      display={{ base: "none", sm: "flex" }}
    >
      <Box mx="3" h="0" w="full" borderColor={"gray.300"} border="solid"></Box>
    </Flex>
  );
}
