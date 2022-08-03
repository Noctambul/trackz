import PageContainer from "components/PageContainer/PageContainer";
import { Web3Context, Web3ContextInterface } from "context/Web3Context";
import type { NextPage } from "next";
import { useContext } from "react";

const Home: NextPage = () => {
  const { tokens } = useContext(Web3Context) as Web3ContextInterface;

  return (
    <PageContainer>
      <>
        {/* <Space
          direction="vertical"
          align="center"
          size="middle"
          className={styles.mixContainer}
        >
          {tokens.map((tokenMetadata, i) => (
            <Song key={i} metadata={tokenMetadata} />
          ))}
        </Space> */}
        Hello World
      </>
    </PageContainer>
  );
};

export default Home;
