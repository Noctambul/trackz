import Trackz from "models/trackz";
import Image from "next/image";

interface Props {
  trackz: Trackz;
}

export default function TrackzInfos({ trackz }: Props): JSX.Element {
  return (
    <div className="flex items-center">
      <div className="relative aspect-square h-10 w-10">
        <Image
          alt={trackz.title}
          src={trackz.coverUri}
          layout="fill"
          // width="100%"
          // height="100%"
          className="text-ellipsis"
        />
      </div>
      <div className="flex-colum mx-4">
        <h3 className="overflow-ellipsis">{trackz.title}</h3>
        <h4>{trackz.author}</h4>
      </div>
    </div>
  );
}
