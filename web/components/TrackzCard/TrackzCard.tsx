import { useIpfs } from "hooks/useIpfs";
import Trackz from "models/trackz";
import Image from "next/image";

type Props = {
  trackz: Trackz;
};

export default function TrackzCard({ trackz }: Props): JSX.Element {
  const { resolveLink } = useIpfs();

  return (
    <div className="flex w-11/12 overflow-hidden rounded-lg bg-gradient-to-tr from-slate-900 to-zinc-700 p-2 shadow-lg shadow-zinc-800">
      <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-lg shadow-xl">
        <Image
          src={resolveLink(trackz.coverUri)}
          layout="fill"
          alt={trackz.title}
        />
      </div>
      <div className="mx-4 flex w-full flex-col justify-between overflow-hidden">
        <span className="truncate text-lg text-text">{trackz.title}</span>
        <span className="truncate text-sm text-subtext">
          by {trackz.author}
        </span>
        {/* <p className="clamp-2 my-1 italic">{trackz.description}</p> */}
        <div className="mt-auto flex items-center justify-between text-text">
          <div className="mt-auto hidden sm:block">
            Supply
            <br />x{trackz.totalSupply}
          </div>
          <div>
            Price
            <br />
            {trackz.price} Tz
          </div>
          <button type="button">Collect</button>
        </div>
      </div>
    </div>
  );
}
