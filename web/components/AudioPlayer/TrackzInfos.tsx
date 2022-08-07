import Trackz from "models/trackz";
import Image from "next/image";

interface Props {
  trackz: Trackz;
}

export default function TrackzInfos({ trackz }: Props): JSX.Element {
  return (
    <div className="flex max-w-md shrink items-center overflow-hidden">
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
      <div className="flex-colum mx-4 overflow-hidden">
        <h3 className="truncate">{trackz.title}</h3>
        <h4 className="truncate">{trackz.author}</h4>
      </div>
    </div>
  );
}
