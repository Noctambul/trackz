import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Trackz from "models/trackz";
import Image from "next/image";

type Props = {
  trackz: Trackz;
};

export default function TrackzCard({ trackz }: Props): JSX.Element {
  const label = ({ title, value }: { title: string; value: string }) => (
    <Flex></Flex>
  );

  return (
    <Flex w={{ base: "100%", md: "50%" }}>
      <Box position="relative" w="126px" h="126px">
        <Image
          src={trackz.coverUri}
          alt={trackz.title}
          width="126px"
          height="126px"
          layout="fill"
        />
      </Box>
      <Flex direction="column" marginLeft="4">
        <Heading as="h3" size="sm" color="gray.100">
          {trackz.title}
        </Heading>
        <Heading as="h3" size="xs" color="gray.500">
          {trackz.author}
        </Heading>
        <Text color="gray.300" fontStyle="italic" marginTop={2}>
          {trackz.description}
        </Text>
        <Flex
          color={"gray.500"}
          fontSize="xs"
          marginTop={"auto"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>
            Supply
            <br />x{trackz.supply}
          </Text>
          <Text>
            Price
            <br />
            {trackz.price} Tz
          </Text>
          <Button size="sm" variant="link">
            Collect
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
