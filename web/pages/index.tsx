import PageContainer from "components/PageContainer/PageContainer";
import TrackzCard from "components/TrackzCard/TrackzCard";
import { useAudio } from "context/AudioContext";
import { useWeb3 } from "context/Web3Context";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { trackzMetadata } = useWeb3();
  const { play, pause, currentTrackz, isPlaying, trackProgress } = useAudio();

  return (
    <PageContainer>
      <div className="space-y-lg my-24 flex h-[500vh] flex-col space-y-10 px-8 sm:px-20">
        {trackzMetadata.length > 0
          ? trackzMetadata.map((track) => (
              <TrackzCard
                trackz={track}
                key={track.id}
                play={play}
                pause={pause}
                isPlaying={isPlaying}
                trackProgress={trackProgress}
                isSelected={currentTrackz?.metadata == track}
              />
            ))
          : "Loading ..."}

        {/* {trackzs.map((trackz) => (
          <TrackzCard trackz={trackz} key={trackz.id} />
        ))} */}
      </div>
    </PageContainer>
  );
};

export default Home;
