import { Box, Flex } from "@chakra-ui/react";

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
        <h1>TRACKZ</h1>
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
