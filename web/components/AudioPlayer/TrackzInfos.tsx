import { useIpfs } from "hooks/useIpfs";
import TrackzMetadata from "models/TrackzMetadata";
import Image from "next/image";
import Link from "next/link";

interface Props {
  trackz: TrackzMetadata;
}

export default function TrackzInfos({ trackz }: Props): JSX.Element {
  const { resolveLink } = useIpfs();

  return (
    <div className="flex items-center">
      <div className="aspect-square relative h-10 w-10 shrink-0 border border-stone-300 bg-white">
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
      <div className="ml-3 hidden w-40 flex-col overflow-hidden pl-4 md:flex">
        <Link
          href={`/trackzs/${trackz.id}`}
          className="truncate text-white"
          aria-label="Title"
        >
          {trackz.name}
        </Link>
        <span className="truncate text-xs text-gray-200" aria-label="Author">
          {trackz.creator}
        </span>
      </div>
    </div>
  );
}
