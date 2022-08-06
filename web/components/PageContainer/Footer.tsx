import { Box } from "@chakra-ui/react";
import AudioPlayer from "components/AudioPlayer/AudioPlayer";
import trackzs from "data/trackzs";

export default function Footer(): JSX.Element {
  return (
    <Box
      position={"fixed"}
      bottom="0"
      left="0"
      h={10}
      bgColor={"bgc"}
      width="100%"
    >
      <AudioPlayer trackz={trackzs[0]} />
    </Box>
  );
}
