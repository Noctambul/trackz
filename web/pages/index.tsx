import PageContainer from "common/components/PageContainer/PageContainer";
import TrackzCardList from "common/components/TrackzCard/TrackzCardList";
import { useWeb3 } from "common/context/Web3Context";
import { useAudio } from "modules/audio/context/AudioContext";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { play, pause, currentTrackz, isPlaying, trackProgress } = useAudio();
  const { audioTrackzs, isLoading } = useWeb3();

  return (
    <PageContainer isLoading={isLoading}>
      <TrackzCardList trackzs={audioTrackzs} />
      {/* <div className="flex flex-col gap-10">
        {audioTrackzs.map((track) => (
          <TrackzCard
            trackz={track}
            key={track.id}
            play={play}
            pause={pause}
            isPlaying={isPlaying}
            trackProgress={trackProgress}
            isSelected={currentTrackz == track}
          />
        ))}
      </div> */}
    </PageContainer>
  );
};

export default Home;
