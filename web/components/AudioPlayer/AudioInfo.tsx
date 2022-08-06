import { Flex, Heading, Image } from "@chakra-ui/react";
import Trackz from "models/trackz";

type Props = {
  trackz: Trackz;
};

export default function AudioInfo({ trackz }: Props): JSX.Element {
  return (
    <Flex alignItems="center" shrink={0}>
      <Image
        src={trackz.coverUri}
        alt={trackz.title}
        objectFit="cover"
        boxSize={10}
      />
      <Flex direction={"column"} ml="2">
        <Heading as="h3" size={"xs"} color="gray.100" textOverflow="ellipsis">
          {trackz.title}
        </Heading>
        <Heading as="h4" size={"xs"} color="gray.400" textOverflow="ellipsis">
          {trackz.author}
        </Heading>
      </Flex>
    </Flex>
  );
}
