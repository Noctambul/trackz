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
  onSearchEnd?: () => void;
}

export default function ProgressBar({
  progress,
  duration,
  disabled,
  onSearch,
  onSearchEnd,
}: Props): JSX.Element {
  const { formatTime } = useTime();

  // const progressElt = (
  //   <div
  //     className={`"mx-3" h-0 w-full shrink rounded border border-gray-300`}
  //   />
  // );

  const ProgressSlider = (
    <Slider
      aria-label="Track progress"
      mx={2}
      min={0}
      max={duration}
      value={progress}
      isDisabled={disabled || !duration}
      onChange={(value) => onSearch?.(value)}
      onChangeEnd={onSearchEnd}
    >
      <SliderTrack bg="blue.100" boxSize={0.5}>
        <SliderFilledTrack bg="primary" />
      </SliderTrack>
      <SliderThumb boxSize={5} _hover={{ boxSize: 6, animation: 500 }}>
        <Box color="tomato" as={BsSoundwave} />
      </SliderThumb>
    </Slider>
  );

  return (
    <div className="hidden w-full items-center justify-between sm:flex sm:shrink">
      <div className="w-10 min-w-[40px] text-xs text-gray-300">
        {formatTime(progress)}
      </div>
      {ProgressSlider}
      <div
        className="w-10 min-w-[40px] text-xs text-gray-300"
        aria-label="Duration"
      >
        {formatTime(duration)}
      </div>
    </div>
  );
}
