import { ImSpinner8 } from "react-icons/im";

type Props = {
  size?: number;
};

export default function Spinner({ size = 5 }: Props): JSX.Element {
  return (
    <span role="status" aria-label="Loading">
      <ImSpinner8 className={`mr-2 h-${size} w-${size} animate-spin`} />
    </span>
  );
}
