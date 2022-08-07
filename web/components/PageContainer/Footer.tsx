import AudioPlayer from "components/AudioPlayer/AudioPlayer";
import Trackz from "models/trackz";

export default function Footer({
  trackzs,
}: {
  trackzs: Trackz[];
}): JSX.Element {
  return (
    <footer className="fixed bottom-0 left-0 h-20 w-screen">
      <AudioPlayer trackz={trackzs[0]} />
    </footer>
  );
}
