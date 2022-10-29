import { IconButton as ChakraIconButton } from "@chakra-ui/react";
import AudioTrackz from "modules/audio/models/AudioTrackz";
import Image from "next/legacy/image";
import Link from "next/link";
import { RiPauseFill, RiPlayFill, RiPlayListAddFill } from "react-icons/ri";

type Props = {
  track: AudioTrackz;
  /** Is the given trackz the one currently selected by the player */
  isSelected: boolean;
  /** Is the player playing a track */
  isPlaying: boolean;
  play: (trackz: AudioTrackz) => void;
  pause: () => void;
  addToPlaylist: (track: AudioTrackz) => void;
};

export default function TrackzCard({
  track,
  play,
  pause,
  isSelected,
  isPlaying,
  addToPlaylist,
}: Props): JSX.Element {
  const iconSize = 20;
  const iconBtnStyle =
    "m-1 opacity-0 transition-opacity group-hover:opacity-80";

  const isPlayingMe = () => isPlaying && isSelected;

  const PlayChakraButton = (
    <ChakraIconButton
      className={iconBtnStyle}
      aria-label={`Play ${track.name}`}
      isRound={true}
      icon={
        isPlayingMe() ? (
          <RiPauseFill size={iconSize} />
        ) : (
          <RiPlayFill size={iconSize} />
        )
      }
      onClick={(e) => {
        e.preventDefault();
        isPlayingMe() ? pause() : play(track);
      }}
      size="lg"
    />
  );

  const AddToPlaylistBtn = (
    <ChakraIconButton
      className={iconBtnStyle}
      icon={<RiPlayListAddFill size={iconSize} />}
      aria-label={`Add ${track.name} to playlist`}
      colorScheme="whiteAlpha"
      size="lg"
      isRound={true}
      onClick={(e) => {
        e.preventDefault();
        addToPlaylist(track);
      }}
    />
  );

  return (
    <div
      className="flex h-full w-full max-w-sm  flex-col items-center rounded-lg border bg-white py-0.5 shadow-md shadow-mediumgray"
      aria-label={`Trackz Card ${track.id}`}
    >
      <Link href={`/trackzs/${track.id}`}>
        <div className="aspect-square group relative h-full w-[calc(100%-0.2rem)] cursor-pointer overflow-hidden rounded-md">
          <Image
            src={track.coverUri}
            alt={track.name}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-0 flex w-full justify-between gap-2">
            {PlayChakraButton}
            {AddToPlaylistBtn}
          </div>
        </div>
      </Link>
      <div className="my-2 w-full px-2">
        <div className="text-md truncate text-text">
          <Link href={`/trackzs/${track.id}`}>{track.name}</Link>
        </div>
        <div className="truncate text-xs text-subtext">
          <Link href={`/users/${track.creator}`}>{track.formatedCreator}</Link>
        </div>
      </div>
    </div>
  );
}
