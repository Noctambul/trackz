import { Box, Flex, Heading } from "@chakra-ui/react";

export default function Header(): JSX.Element {
  return (
    <Box
      position={"fixed"}
      display="flex"
      alignItems={"center"}
      justifyContent="center"
      w="full"
      top={0}
    >
      <Flex
        alignItems="center"
        justifyContent="space-around"
        bgColor="bgc"
        color="primary"
        fontWeight={"bold"}
        w="full"
        h="14"
      >
        <Heading as="h1" lineHeight={"100%"} fontWeight="bold">
          TRACKZ
        </Heading>
        <Box w="5" h="5" bgColor={"primary"} borderRadius={"100%"} />
      </Flex>
    </Box>
  );
}
