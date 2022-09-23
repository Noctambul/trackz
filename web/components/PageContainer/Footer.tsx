import AudioPlayer from "components/AudioPlayer/AudioPlayer";
import { useAudio } from "context/AudioContext";

export default function Footer(): JSX.Element {
  const { trackProgress, currentTrackz, duration, onSearch, onSearchEnd } =
    useAudio();

  return (
    <>
      {currentTrackz && (
        <footer className="fixed bottom-0 left-0 z-50 h-14 w-screen border-t  text-primary">
          <div className="h-full w-full bg-white px-4 sm:px-8">
            {currentTrackz && (
              <AudioPlayer
                trackz={currentTrackz}
                trackProgress={trackProgress}
                duration={duration}
                onSearch={onSearch}
                onSearchEnd={onSearchEnd}
              />
            )}
          </div>
        </footer>
      )}
    </>
  );
}
