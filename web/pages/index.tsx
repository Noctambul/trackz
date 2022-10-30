import PageContainer from "common/components/PageContainer/PageContainer";
import TrackzCardList from "common/components/TrackzCard/TrackzCardList";
import { useAudio } from "modules/audio/context/AudioContext";
import { useWeb3 } from "modules/web3/context/Web3Context";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const { play, pause, currentTrackz, isPlaying, trackProgress } = useAudio();
  const { audioTrackzs, isLoading } = useWeb3();

  return (
    <>
      <Head>
        <title>Trackz</title>
      </Head>
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
    </>
  );
};

export default Home;
