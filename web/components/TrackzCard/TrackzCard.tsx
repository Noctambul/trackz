import Trackz from "models/trackz";
import Image from "next/image";

type Props = {
  trackz: Trackz;
};

export default function TrackzCard({ trackz }: Props): JSX.Element {
  return (
    <div className="flex">
      <Image
        src={trackz.coverUri}
        width="126px"
        height="126px"
        alt={trackz.title}
      />
      <div className="flex-colum mx-4 overflow-hidden">
        <h3 className="truncate">{trackz.title}</h3>
        <h4 className="truncate">{trackz.author}</h4>
      </div>
    </div>
  );
}
