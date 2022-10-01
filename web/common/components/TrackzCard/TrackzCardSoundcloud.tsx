import IconButton from "common/components/uikit/IconButton";
import Progress from "common/components/uikit/Progress";
import { useIpfs } from "common/hooks/useIpfs";
import { useTime } from "common/hooks/useTime";
import useAudioTrackz from "modules/audio/hooks/useAudioTrackz";
import AudioTrackz from "modules/audio/models/AudioTrackz";
import Image from "next/image";
import Link from "next/link";
import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";

type Props = {
  trackz: AudioTrackz;
  trackProgress: number;
  /** Is the given trackz the one currently selected by the player */
  isSelected: boolean;
  /** Is the player playing a track */
  isPlaying: boolean;
  play: (trackz: AudioTrackz) => void;
  pause: () => void;
};

export default function TrackzCardSoundcloud({
  trackz,
  trackProgress,
  play,
  pause,
  isSelected,
  isPlaying,
}: Props): JSX.Element {
  const { resolveLink } = useIpfs();
  const { formatTime } = useTime();
  const { duration } = useAudioTrackz(trackz);

  const MarketSection = (
    <div className="mt-auto flex items-center justify-between text-lightgray">
      <div className="mt-auto" aria-label="Supply">
        Supply
        <br />x{trackz.metadata.totalSupply}
      </div>
      <div aria-label="Price">
        Price
        <br />
        {trackz.metadata.price} Tz
      </div>
      <button type="button">Collect</button>
    </div>
  );

  const InfoSection = (
    <div className="ml-2 flex w-full flex-col justify-center pr-14">
      <span aria-label="Title">
        <Link
          href={`/trackzs/${trackz.id}`}
          className="truncate text-lg text-text"
          aria-label="Title"
        >
          {trackz.name}
        </Link>
      </span>
      <span className="truncate text-sm text-subtext" aria-label="Author">
        by {trackz.metadata.creator}
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
    <div className="flex w-full" aria-label={`Trackz Card ${trackz.id}`}>
      <Link href={`/trackzs/${trackz.id}`}>
        <div className="aspect-square relative h-[126px] w-[126px] shrink-0 border border-lightgray">
          {trackz.metadata.coverUri && (
            <Image
              src={resolveLink(trackz.metadata.coverUri)}
              layout="fill"
              objectFit="cover"
              alt={trackz.name}
              className="cursor-pointer"
            />
          )}
        </div>
      </Link>
      <div className="ml-4 flex w-full flex-col justify-between overflow-hidden">
        <div className="mb-1 flex">
          {PlayButton}
          {InfoSection}
        </div>
        <div className="flex h-full items-center">
          <Progress
            value={isSelected && duration > 0 ? trackProgress : 0}
            max={duration}
            className="mx-2 pr-2"
          />
          {true ? (
            <div className="text-xs" aria-label="Duration">
              {formatTime(duration)}
            </div>
          ) : (
            <></>
          )}
        </div>
        {MarketSection}
      </div>
    </div>
  );
}
