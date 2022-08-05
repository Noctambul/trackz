import Header from "components/PageContainer/Header";
import PageContainer from "components/PageContainer/PageContainer";
import { Web3Context, Web3ContextInterface } from "context/Web3Context";
import type { NextPage } from "next";
import { useContext } from "react";

const Home: NextPage = () => {
  const { tokens } = useContext(Web3Context) as Web3ContextInterface;

  return (
    <PageContainer>
      <Header />
      <h1 className="text-3x font-bold underline">Hello world !</h1>
    </PageContainer>
  );
};

export default Home;
