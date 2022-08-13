import Image from "next/image";
import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";
import { useAudio } from "../../context/AudioContext";
import { useIpfs } from "../../hooks/useIpfs";
import Trackz from "../../models/trackz";
import ProgressBar from "../AudioPlayer/ProgressBar";
import IconButton from "../uikit/IconButton";

type Props = {
  trackz: Trackz;
};

export default function TrackzCard({ trackz }: Props): JSX.Element {
  const { resolveLink } = useIpfs();
  const { play, pause, currentTrackz, isPlaying } = useAudio();

  const MarketSection = (
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
  );

  const InfoSection = (
    <div className="ml-2 flex flex-col justify-center">
      <span className="truncate text-lg text-text">{trackz.title}</span>
      <span className="truncate text-sm text-subtext">by {trackz.author}</span>
      {/* <p className="clamp-2 my-1 italic">{trackz.description}</p> */}
    </div>
  );

  const isPlayingMe = () => isPlaying && trackz == currentTrackz;
  const PlayButton = (
    <IconButton
      Icon={isPlayingMe() ? IoPauseCircleOutline : IoPlayCircleOutline}
      size="5xl"
      className="fill-text stroke-text text-5xl"
      onClick={() => {
        isPlayingMe() ? pause() : play(trackz);
      }}
    />
  );

  return (
    <div className="flex">
      <div className="relative h-[120px] w-[120px] shrink-0">
        <Image
          src={resolveLink(trackz.coverUri)}
          layout="fill"
          alt={trackz.title}
        />
      </div>
      <div className="mx-4 flex w-full flex-col justify-between overflow-hidden">
        <div className="mb-1 flex">
          {PlayButton}
          {InfoSection}
        </div>
        <ProgressBar hideCurrentTime trackz={trackz} />
        {MarketSection}
      </div>
    </div>
  );
}
