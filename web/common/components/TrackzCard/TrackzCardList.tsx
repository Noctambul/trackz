import AudioTrackz from "modules/audio/models/AudioTrackz";
import TrackzCard from "./TrackzCard";

type Props = {
  trackzs: AudioTrackz[];
};

export default function TrackzCardList({ trackzs }: Props): JSX.Element {
  return (
    <div className="lg-gap6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {trackzs.map((track) => (
        <div key={track.id} className="flex items-center justify-center">
          <TrackzCard track={track} />
        </div>
      ))}
    </div>
  );
}
