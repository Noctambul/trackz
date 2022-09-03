import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Spinner from "./Spinner";

type HTMLButtonAttr = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonProps extends Omit<HTMLButtonAttr, "disabled"> {
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const style =
  "rounded-xl p-5 flex justify-center h-8 items-center border-primary enabled:border bg-primary enabled:transition-all enabled:duration-200 hover:enabled:bg-zinc-800 hover:enabled:text-primary align-text-top disabled:bg-zinc-600 disabled:text-subtext";

export default function Button({
  children,
  isDisabled = false,
  isLoading = false,
  loadingText = "Loading...",
  ...props
}: ButtonProps): JSX.Element {
  props.type ??= "button";
  props.className = style + " " + props.className;

  return (
    <button disabled={isDisabled || isLoading} {...props}>
      {isLoading && <Spinner size={6} />}
      <span className="mt-0.5">{isLoading ? loadingText : children}</span>
    </button>
  );
}
