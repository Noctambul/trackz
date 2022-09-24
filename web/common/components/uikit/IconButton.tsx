import { motion, type HTMLMotionProps } from "framer-motion";
import { IconType } from "react-icons";

interface Props
  extends Omit<
    React.PropsWithChildren<HTMLMotionProps<"button">>,
    "type" | "size"
  > {
  Icon: IconType;
  size?: string;
}

export default function IconButton({ Icon, ...props }: Props): JSX.Element {
  return (
    <motion.button
      type="button"
      {...props}
      whileHover={!props.disabled ? { scale: 1.05 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Icon className={`fill-inherit stroke-inherit text-inherit`} />
    </motion.button>
  );
}
