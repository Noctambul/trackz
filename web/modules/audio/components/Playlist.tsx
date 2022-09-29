import { IconButton, useDisclosure } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { RiPlayListAddFill } from "react-icons/ri";
import { useAudio } from "../context/AudioContext";
import PlaylistTrack from "./PlaylistTrack";

type Props = {};

export default function Playlist({}: Props): JSX.Element {
  const { isOpen, onToggle } = useDisclosure();
  const { playlist, currentIndex, play, pause, isPlaying, removeAt } =
    useAudio();

  return (
    <>
      <IconButton
        onClick={onToggle}
        variant="audioplayer"
        aria-label="Playlist Button"
        icon={<RiPlayListAddFill size={22} />}
      />

      <div
        className={`fixed right-0 bottom-14 ${
          isOpen ? "visible top-0 sm:top-44" : "invisible top-[100vh]"
        } z-[-1] w-screen overflow-y-scroll rounded bg-white py-2 text-text shadow-player transition-all duration-500 scrollbar-hide sm:w-[400px]`}
        aria-label="Playlist"
      >
        <div className="flex h-12 flex-row-reverse px-2">
          <IconButton
            color="text"
            variant="link"
            icon={<AiOutlineClose size={20} />}
            aria-label="Close Playlist"
            onClick={onToggle}
          />
        </div>
        <div className="flex w-full flex-col justify-center text-sm">
          {playlist.map((track, index) => {
            const isSelected = index === currentIndex;
            const isPassed = index < currentIndex;
            return (
              <PlaylistTrack
                key={index}
                isSelected={isSelected}
                isPlaying={isPlaying}
                isPassed={isPassed}
                play={play}
                pause={pause}
                remove={() => removeAt(index)}
                track={track}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
