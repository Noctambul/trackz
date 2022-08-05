import PageContainer from "components/PageContainer/PageContainer";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold underline">Hello world !</h1>
    </PageContainer>
  );
};

export default Home;
