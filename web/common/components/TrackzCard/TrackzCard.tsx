import { useIpfs } from "common/hooks/useIpfs";
import AudioTrackz from "modules/audio/models/AudioTrackz";
import Image from "next/image";
import Link from "next/link";

type Props = {
  track: AudioTrackz;
};

export default function TrackzCard({ track }: Props): JSX.Element {
  const { resolveLink } = useIpfs();

  return (
    <div className="flex h-[400px] w-[330px] flex-col items-center rounded-lg bg-white py-2 shadow-md">
      <Link href={`trackzs/${track.id}`}>
        <div className="aspect-square relative h-[330px] w-[320px] cursor-pointer overflow-hidden rounded-md border border-lightgray">
          <Image
            src={track.coverUri}
            alt={track.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Link>
      <div className="my-2 w-full px-2">
        <div className="truncate text-lg text-text">
          <Link href={`trackzs/${track.id}`}>{track.name}</Link>
        </div>
        <div className="truncate text-sm text-subtext">{track.creator}</div>
      </div>
    </div>
  );
}
