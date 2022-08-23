import IconButton from "components/uikit/IconButton";
import Progress from "components/uikit/Progress";
import { useAudio } from "context/AudioContext";
import { useIpfs } from "hooks/useIpfs";
import { useTime } from "hooks/useTime";
import Trackz from "models/trackz";
import Image from "next/image";
import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";

type Props = {
  trackz: Trackz;
};

export default function TrackzCard({ trackz }: Props): JSX.Element {
  const { resolveLink } = useIpfs();
  const { formatTime } = useTime();
  const { play, pause, currentTrackz, isPlaying, trackProgress, duration } =
    useAudio();

  const MarketSection = (
    <div className="mt-auto flex items-center justify-between text-gray-400">
      <div className="mt-auto" aria-label="Supply">
        Supply
        <br />x{trackz.totalSupply}
      </div>
      <div aria-label="Price">
        Price
        <br />
        {trackz.price} Tz
      </div>
      <button type="button">Collect</button>
    </div>
  );

  const InfoSection = (
    <div className="ml-2 flex flex-col justify-center">
      <span className="truncate text-lg text-text" aria-label="Title">
        {trackz.title}
      </span>
      <span className="truncate text-sm text-subtext" aria-label="Author">
        by {trackz.author}
      </span>
      {/* <p className="line-clamp-2 my-1 italic">{trackz.description}</p> */}
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
      aria-label="Play Button"
    />
  );
  const myTrackIsSelectedForPlaying = trackz == currentTrackz;

  return (
    <div className="flex" aria-label={`Trackz Card ${trackz.id}`}>
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
        <div className="flex h-full items-center">
          <Progress
            value={myTrackIsSelectedForPlaying ? trackProgress : 0}
            max={trackz.duration}
            className="mx-2 pr-2"
          />
          <div className="text-xs" aria-label="Duration">
            {formatTime(trackz.duration)}
          </div>
        </div>
        {MarketSection}
      </div>
    </div>
  );
}
