import Slider from "components/uikit/Slider";
import { useAudio } from "context/AudioContext";
import { TbVolume, TbVolume2, TbVolume3 } from "react-icons/tb";

export default function Volume({}): JSX.Element {
  const { volume, setVolume } = useAudio();

  const VolumeIcon =
    volume > 0.4 ? TbVolume : volume > 0 ? TbVolume2 : TbVolume3;

  return (
    <div className="ml-2 flex items-center justify-center pl-2">
      <VolumeIcon className="mr-2 text-2xl" />
      <Slider
        min={0}
        max={100}
        value={volume * 100}
        onChange={(vol) => setVolume(vol / 100)}
        className="w-20"
      />
    </div>
  );
}
