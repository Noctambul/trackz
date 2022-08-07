import Trackz from "models/trackz";
import Image from "next/image";

type Props = {
  trackz: Trackz;
};

export default function TrackzCard({ trackz }: Props): JSX.Element {
  return (
    <div className="flex max-w-xl">
      <div className="relative h-[126px] w-[126px] shrink-0">
        <Image src={trackz.coverUri} layout="fill" alt={trackz.title} />
      </div>
      <div className="mx-4 flex w-full flex-col justify-between overflow-hidden">
        <h3 className="truncate">{trackz.title}</h3>
        <h4 className="truncate">{trackz.author}</h4>
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
