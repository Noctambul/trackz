import { IconButton } from "@chakra-ui/react";
import AudioTrackz from "modules/audio/models/AudioTrackz";
import Image from "next/image";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiOutlineCloseSquare,
} from "react-icons/ai";

type Props = {
  isSelected?: boolean;
  isPassed?: boolean;
  isPlaying?: boolean;
  track: AudioTrackz;
  play: (track: AudioTrackz) => void;
  pause: () => void;
  remove: (track: AudioTrackz) => void;
};

export default function PlaylistTrack({
  isSelected = false,
  isPlaying = false,
  isPassed = false,
  track,
  play,
  pause,
  remove,
}: Props): JSX.Element {
  const isPlayingMe = isPlaying && isSelected;
  const backgroundStyle = isSelected ? "bg-lightgray" : "hover:bg-bgc";

  return (
    <div
      className={`group flex h-14 w-full cursor-pointer items-center gap-4 ${backgroundStyle} p-4`}
      aria-label={`Track ${track.name}`}
      onClick={() => (isPlayingMe ? pause() : play(track))}
      role="button"
    >
      <div className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center border border-lightgray">
        <Image
          className={`${isPassed && "opacity-40"}`}
          src={track.coverUri}
          objectFit="cover"
          layout="fill"
          alt={track.name}
        />
        <div
          className={`duration-400 relative ${
            isSelected || "hidden"
          } rounded-full bg-bgc transition-all group-hover:block `}
        >
          {/* TODO: Should create both button and just switch between them */}
          {isPlaying && isSelected ? (
            <AiFillPauseCircle
              data-test-pause={track.id}
              className="relative stroke-text text-3xl"
            />
          ) : (
            <AiFillPlayCircle
              data-test-play={track.id}
              className="relative stroke-text text-3xl"
            />
          )}
        </div>
      </div>
      <div
        className={`flex grow flex-col truncate ${isPassed && "opacity-40"}`}
      >
        <p className="truncate">{track.name}</p>
        <p className="truncate text-xs text-subtext">{track.creator}</p>
      </div>
      <div className="shrink-0 text-xs text-subtext">
        {track.formattedDuration}
      </div>
      <IconButton
        aria-label="Remove from the playlist"
        size="xs"
        variant="outline"
        onClick={(e) => {
          console.log("Remove ", track.id);
          e.preventDefault();
          e.stopPropagation();
          remove(track);
        }}
        icon={<AiOutlineCloseSquare />}
      />
    </div>
  );
}
