import { AudioContext, AudioContextInterface } from "context/AudioContext";
import { useIpfs } from "hooks/useIpfs";
import Trackz from "models/trackz";
import Image from "next/image";
import { useContext } from "react";

type Props = {
  trackz: Trackz;
};

export default function TrackzCard({ trackz }: Props): JSX.Element {
  const { resolveLink } = useIpfs();
  const { play, pause } = useContext(AudioContext) as AudioContextInterface;

  return (
    <div className="flex">
      <div className="relative h-[120px] w-[120px] shrink-0">
        <Image
          src={resolveLink(trackz.coverUri)}
          layout="fill"
          alt={trackz.title}
          onClick={() => play(trackz)}
        />
      </div>
      <div className="mx-4 flex w-full flex-col justify-between overflow-hidden">
        <span className="truncate text-lg text-text">{trackz.title}</span>
        <span className="truncate text-sm text-subtext">
          by {trackz.author}
        </span>
        {/* <p className="clamp-2 my-1 italic">{trackz.description}</p> */}
        <div className="mt-auto flex items-center justify-between text-gray-400">
          <div className="mt-auto">
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
