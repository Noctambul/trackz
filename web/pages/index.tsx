import { Flex } from "@chakra-ui/react";
import PageContainer from "components/PageContainer/PageContainer";
import Trackz from "components/TrackzCard";
import trackzs from "data/trackzs";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Flex
        m="8"
        direction="column"
        // justifyContent="center"
        alignItems="center"
        h="550vh"
        bg="blue.400"
        overflowY="scroll"
      >
        {trackzs.map((trackz) => (
          <Trackz key={trackz.title} trackz={trackz} />
        ))}
      </Flex>
    </PageContainer>
  );
};

export default Home;
