import AudioPlayer from "components/AudioPlayer/AudioPlayer";
import { useAudio } from "context/AudioContext";

export default function Footer(): JSX.Element {
  const { trackProgress, currentTrackz, duration, onSearch, onSearchEnd } =
    useAudio();

  return (
    <>
      {currentTrackz && (
        <footer
          className="fixed bottom-0 left-0 h-14 w-screen bg-bgc px-4 text-white sm:px-8
        "
        >
          {currentTrackz && (
            <AudioPlayer
              trackz={currentTrackz}
              trackProgress={trackProgress}
              duration={duration}
              onSearch={onSearch}
              onSearchEnd={onSearchEnd}
            />
          )}
        </footer>
      )}
    </>
  );
}
