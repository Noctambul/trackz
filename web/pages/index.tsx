import PageContainer from "components/PageContainer/PageContainer";
import TrackzCard from "components/TrackzCard/TrackzCard";
import { useAudio } from "context/AudioContext";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TestSchema = z.object({
  name: z.string(),
  age: z.number(),
});

export type TestSchemaType = z.infer<typeof TestSchema>;

const Home: NextPage = () => {
  const { playlist, play, pause, currentTrackz, isPlaying, trackProgress } =
    useAudio();
  const { handleSubmit, register, formState } = useForm({
    // resolver: zodResolver(TestSchema),
  });

  return (
    <PageContainer>
      <div className="my-24 flex flex-col space-y-10 px-8 sm:px-20">
        {playlist.length > 0
          ? playlist.map((track) => (
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
          : "Loading ..."}

        {/* {trackzs.map((trackz) => (
          <TrackzCard trackz={trackz} key={trackz.id} />
        ))} */}
      </div>
    </PageContainer>
  );
};

export default Home;
