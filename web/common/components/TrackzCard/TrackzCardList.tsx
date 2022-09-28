import AudioTrackz from "modules/audio/models/AudioTrackz";
import TrackzCard from "./TrackzCard";

type Props = {
  trackzs: AudioTrackz[];
};

export default function TrackzCardList({ trackzs }: Props): JSX.Element {
  return (
    <div className="grid grid-flow-row grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4">
      {trackzs.map((track) => (
        <div
          key={track.id}
          className="flex h-[400px] items-center justify-center sm:h-[300px]"
        >
          <TrackzCard track={track} />
        </div>
      ))}
    </div>
  );
}
