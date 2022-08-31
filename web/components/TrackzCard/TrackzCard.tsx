import IconButton from "components/uikit/IconButton";
import Progress from "components/uikit/Progress";
import { useIpfs } from "hooks/useIpfs";
import { useTime } from "hooks/useTime";
import TrackzMetadata from "models/TrackzMetadata";
import Image from "next/image";
import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";

type Props = {
  trackz: TrackzMetadata;
  trackProgress: number;
  /** Is the given trackz the one currently selected by the player */
  isSelected: boolean;
  /** Is the player playing a track */
  isPlaying: boolean;
  play: (trackz: TrackzMetadata) => void;
  pause: () => void;
};

export default function TrackzCard({
  trackz,
  trackProgress,
  play,
  pause,
  isSelected,
  isPlaying,
}: Props): JSX.Element {
  const { resolveLink } = useIpfs();
  const { formatTime } = useTime();

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
        {trackz.name}
      </span>
      <span className="truncate text-sm text-subtext" aria-label="Author">
        by {trackz.owner}
      </span>
      {/* <p className="line-clamp-2 my-1 italic">{trackz.description}</p> */}
    </div>
  );

  const isPlayingMe = () => {
    return isPlaying && isSelected;
  };
  const PlayButton = (
    <IconButton
      Icon={isPlayingMe() ? IoPauseCircleOutline : IoPlayCircleOutline}
      size="5xl"
      className="fill-text stroke-text text-5xl"
      onClick={() => {
        isPlayingMe() ? pause() : play(trackz);
      }}
      aria-label={`Play ${trackz.name}`}
    />
  );

  return (
    <div
      className="mx-auto flex w-screen"
      aria-label={`Trackz Card ${trackz.id}`}
    >
      <div className="relative h-[120px] w-[120px] shrink-0">
        <Image
          src={resolveLink(trackz.coverUri)}
          layout="fill"
          alt={trackz.name}
        />
      </div>
      <div className="mx-4 flex w-full flex-col justify-between overflow-hidden">
        <div className="mb-1 flex">
          {PlayButton}
          {InfoSection}
        </div>
        <div className="flex h-full items-center">
          <Progress
            value={isSelected ? trackProgress : 0}
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
