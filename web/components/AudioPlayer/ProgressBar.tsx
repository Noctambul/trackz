import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useTime } from "hooks/useTime";
import { BsSoundwave } from "react-icons/bs";

interface Props {
  /** The current progress in seconds */
  progress: number;
  /** The track duration in seconds */
  duration: number;
  disabled?: boolean;
  onSearch?: (seconds: number) => void;
  onSearchEnd?: (seconds: number) => void;
}

export default function ProgressBar({
  progress,
  duration,
  disabled = false,
  onSearch,
  onSearchEnd,
}: Props): JSX.Element {
  const { formatTime } = useTime();

  return (
    <div className="flex w-full items-center justify-between sm:shrink">
      <div className="mr-2 hidden w-10 min-w-[40px] text-xs text-gray-300 sm:block">
        {formatTime(progress)}
      </div>

      {/* <SliderRender
        min={0}
        max={duration}
        value={progress}
        isDisabled={disabled} // And duration === 0
        onChange={onSearch}
        onChangeEnd={onSearchEnd}
      /> */}

      <Slider
        aria-label="Track progress"
        min={0}
        max={duration}
        value={progress}
        isDisabled={disabled} // And duration === 0
        onChange={onSearch}
        onChangeEnd={onSearchEnd}
        focusThumbOnChange={false}
      >
        <SliderTrack bg="blue.100" boxSize={0.5}>
          <SliderFilledTrack bg="primary" />
        </SliderTrack>
        <SliderThumb
          boxSize={{ base: 4, sm: 5 }}
          bg={{ base: "primary", sm: "white" }}
        >
          <Box color={{ base: "primary", sm: "tomato" }} as={BsSoundwave} />
        </SliderThumb>
      </Slider>
      <div
        className="ml-2 hidden w-10 min-w-[40px] text-xs text-gray-300 sm:block"
        aria-label="Duration"
      >
        {formatTime(duration)}
      </div>
    </div>
  );
}
