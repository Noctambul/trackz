import AudioPlayer from "components/AudioPlayer/AudioPlayer";
import { useAudio } from "context/AudioContext";

export default function Footer(): JSX.Element {
  const { currentTrackz } = useAudio();

  return (
    <>
      {currentTrackz && (
        <footer className="fixed bottom-0 left-0 h-20 w-screen bg-bgc px-8">
          {currentTrackz && <AudioPlayer trackz={currentTrackz} />}
        </footer>
      )}
    </>
  );
}
