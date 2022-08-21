import Slider from "components/uikit/Slider";
import { useAudio } from "context/AudioContext";
import { TbVolume } from "react-icons/tb";

export default function Volume({}): JSX.Element {
  const { volume, setVolume } = useAudio();

  return (
    <div className="ml-2 flex items-center justify-center pl-2">
      <TbVolume className="mr-2 text-2xl" />
      <Slider
        min={0}
        max={1}
        value={volume}
        onChange={setVolume}
        className="w-20"
      />
    </div>
  );
}
