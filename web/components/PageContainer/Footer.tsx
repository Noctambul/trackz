import { Box } from "@chakra-ui/react";
import AudioPlayer from "components/AudioPlayer/AudioPlayer";

export default function Footer(): JSX.Element {
  return (
    <Box position={"fixed"} bottom="0" bgColor={"bgc"} width="100%">
      <AudioPlayer />
    </Box>
  );
}
