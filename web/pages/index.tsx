import PageContainer from "components/PageContainer/PageContainer";
import TrackzCard from "components/TrackzCard/TrackzCard";
import trackzs from "data/trackzs";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageContainer>
      <div className="space-y-lg my-24 flex h-[500vh] flex-col space-y-10 px-8 sm:px-20">
        {trackzs.map((trackz) => (
          <TrackzCard trackz={trackz} key={trackz.id} />
        ))}
      </div>
    </PageContainer>
  );
};

export default Home;
