import { Box, Flex, Heading } from "@chakra-ui/react";

export default function Header(): JSX.Element {
  return (
    <Box position={"fixed"} width="100%" top={0}>
      <Flex
        alignItems="center"
        justifyContent="space-around"
        bgColor="bgc"
        color="primary"
        fontWeight={"bold"}
      >
        <Heading as="h1">TRACKZ</Heading>
        <Box
          width={"10px"}
          height="10px"
          bgColor={"primary"}
          borderRadius={"100%"}
        />
      </Flex>
    </Box>
  );
}
