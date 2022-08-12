import { IconType } from "react-icons";

export default function IconButton({
  Icon,
  ...props
}: {
  Icon: IconType;
  size?: string;
  [x: string]: any;
}): JSX.Element {
  const size = props.size || "3xl";

  return (
    <button type="button" {...props}>
      <Icon className={`fill-inherit stroke-inherit text-inherit`} />
    </button>
  );
}
