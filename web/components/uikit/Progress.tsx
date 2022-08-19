import React from "react";

const webkitStyle =
  "[&::-webkit-progress-bar]:bg-subtext [&::-webkit-progress-value]:bg-primary";
const mozStyle = "[&::-moz-progress-bar]:bg-primary";

export default function Progress({
  value,
  max,
  ...props
}: React.HTMLProps<HTMLProgressElement>): JSX.Element {
  return (
    <progress
      className={`h-0.5 w-full rounded ${webkitStyle} ${mozStyle} ${props.className}`}
      value={value}
      max={max}
    />
  );
}
