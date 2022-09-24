import PageContainer from "components/PageContainer/PageContainer";
import TrackzCard from "components/TrackzCard/TrackzCard";
import { useAudio } from "features/audio/context/AudioContext";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { playlist, play, pause, currentTrackz, isPlaying, trackProgress } =
    useAudio();

  return (
    <PageContainer isLoading={playlist.length === 0}>
      <div className="flex flex-col gap-10">
        {playlist.map((track) => (
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
      </div>
    </PageContainer>
  );
};

export default Home;
