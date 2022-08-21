import { IconType } from "react-icons";

interface Props
  extends Omit<React.HTMLProps<HTMLButtonElement>, "type" | "size"> {
  Icon: IconType;
  size?: string;
}

export default function IconButton({ Icon, ...props }: Props): JSX.Element {
  return (
    <button type="button" {...props}>
      <Icon className={`fill-inherit stroke-inherit text-inherit`} />
    </button>
  );
}
