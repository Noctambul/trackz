import { useAudio } from "context/AudioContext";

import {
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Slider,
  SliderFilledTrack,
  SliderTrack,
} from "@chakra-ui/react";
import { TbVolume, TbVolume2, TbVolume3 } from "react-icons/tb";

export default function Volume({}): JSX.Element {
  const { volume, setVolume, isMuted, toggleMute } = useAudio();

  const VolumeIcon = isMuted ? TbVolume3 : volume > 0.4 ? TbVolume : TbVolume2;

  return (
    <Popover offset={[-6, 0]} placement="top" trigger="hover">
      <PopoverTrigger>
        <IconButton
          onClick={toggleMute}
          aria-label="Volume controller"
          variant="audioplayer"
          icon={
            <VolumeIcon
              className="mr-2 text-2xl"
              aria-label={isMuted ? "Unmute" : "Mute"}
            />
          }
        />
      </PopoverTrigger>
      <PopoverContent
        display={{ base: "none", sm: "block" }}
        border={0}
        bg="bgc"
        w={12}
        pt={4}
        pb={1}
        borderRadius={0}
      >
        <PopoverBody className="flex items-center justify-center">
          <Slider
            min={0}
            max={100}
            value={volume * 100}
            onChange={(vol) => setVolume(vol / 100)}
            h={28}
            orientation="vertical"
          >
            <SliderTrack
              boxSize={3}
              borderRadius="1.75rem"
              aria-label="Track volume"
            >
              <SliderFilledTrack bg="primary" />
            </SliderTrack>
          </Slider>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
