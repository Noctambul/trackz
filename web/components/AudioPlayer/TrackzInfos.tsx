import { useIpfs } from "hooks/useIpfs";
import TrackzMetadata from "models/TrackzMetadata";
import Image from "next/image";

interface Props {
  trackz: TrackzMetadata;
}

export default function TrackzInfos({ trackz }: Props): JSX.Element {
  const { resolveLink } = useIpfs();

  return (
    <div className="w-md flex shrink-0 items-center overflow-hidden">
      <div className="aspect-square relative h-10 w-10">
        <Image
          alt={trackz.name}
          src={resolveLink(trackz.coverUri)}
          layout="fill"
          // width="100%"
          // height="100%"
          className="text-ellipsis"
        />
      </div>
      <div className="ml-3 flex w-40 flex-col overflow-hidden pl-4">
        <span className="truncate text-sm text-text" aria-label="Title">
          {trackz.name}
        </span>
        <span className="truncate text-xs text-subtext" aria-label="Author">
          {trackz.owner}
        </span>
      </div>
    </div>
  );
}
