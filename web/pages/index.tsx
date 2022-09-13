import { Container, Spinner } from "@chakra-ui/react";
import PageContainer from "components/PageContainer/PageContainer";
import TrackzCard from "components/TrackzCard/TrackzCard";
import { useAudio } from "context/AudioContext";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { playlist, play, pause, currentTrackz, isPlaying, trackProgress } =
    useAudio();

  return (
    <PageContainer>
      <div className="mx-14 flex w-full flex-col space-y-10">
        {playlist.length > 0 ? (
          playlist.map((track) => (
            <TrackzCard
              trackz={track}
              key={track.id}
              play={play}
              pause={pause}
              isPlaying={isPlaying}
              trackProgress={trackProgress}
              isSelected={currentTrackz == track}
            />
          ))
        ) : (
          <Container centerContent h="500px" style={{ display: "flex" }}>
            <Spinner size="xl" />
          </Container>
        )}

        {/* {trackzs.map((trackz) => (
          <TrackzCard trackz={trackz} key={trackz.id} />
        ))} */}
      </div>
    </PageContainer>
  );
};

export default Home;
