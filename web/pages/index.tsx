import PageContainer from "components/PageContainer/PageContainer";
import TrackzCard from "components/TrackzCard/TrackzCard";
import trackzs from "data/trackzs";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageContainer>
      <div className="m-24 flex h-[500vh] flex-col items-center">
        {trackzs.map((trackz) => (
          <TrackzCard trackz={trackz} key={trackz.id} />
        ))}
      </div>
    </PageContainer>
  );
};

export default Home;
