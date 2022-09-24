import { useIpfs } from "common/hooks/useIpfs";
import TrackzMetadata from "models/TrackzMetadata";
import Image from "next/image";
import Link from "next/link";

interface Props {
  trackz: TrackzMetadata;
}

export default function TrackzInfos({ trackz }: Props): JSX.Element {
  const { resolveLink } = useIpfs();

  return (
    <div className="flex items-center" key={trackz.id}>
      <Link href={`/trackzs/${trackz.id}`}>
        <div className="aspect-square relative h-10 w-10 shrink-0 cursor-pointer border border-lightgray bg-white">
          {trackz.coverUri && (
            <Image
              alt={trackz.name}
              src={resolveLink(trackz.coverUri)}
              layout="fill"
              objectFit="cover"
              className="text-ellipsis"
            />
          )}
        </div>
      </Link>
      <div className="ml-3 hidden w-40 flex-col overflow-hidden pl-4 md:flex">
        <span aria-label="Title">
          <Link href={`/trackzs/${trackz.id}`} className="truncate text-white">
            {trackz.name}
          </Link>
        </span>
        <span className="truncate text-xs text-subtext" aria-label="Author">
          {trackz.creator}
        </span>
      </div>
    </div>
  );
}
