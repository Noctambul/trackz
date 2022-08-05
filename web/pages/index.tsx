import Header from "components/PageContainer/Header";
import PageContainer from "components/PageContainer/PageContainer";
import type { NextPage } from "next";

const Home: NextPage = () => {
  // const { tokens } = useContext(Web3Context) as Web3ContextInterface;

  return (
    <PageContainer>
      <Header />
      <h1 className="text-3x font-bold underline">Hello world !</h1>
    </PageContainer>
  );
};

export default Home;
