import { Tag, TagCloseButton, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { useMemo } from "react";
import { IoMdAdd } from "react-icons/io";

type Props = {
  options: readonly string[];
  value: string[];
  onChange: (val: string[]) => void;
};

export default function TagSelector({
  options,
  value = [],
  onChange,
}: Props): JSX.Element {
  const currentOptions = useMemo(
    () => options.filter((opt) => !value.includes(opt)),
    [options, value]
  );

  function onAdd(value: string) {}

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {currentOptions.map((opt) => (
          <Tag
            key={"add-" + opt}
            role="button"
            onClick={(e) => {
              e.preventDefault();
              onChange([...value, opt]);
            }}
          >
            <TagLeftIcon as={IoMdAdd} />
            <TagLabel>{opt}</TagLabel>
          </Tag>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 border p-4">
        {value.map((genre: string) => (
          <Tag key={genre}>
            <TagLabel>{genre}</TagLabel>
            <TagCloseButton
              onClick={(e) => {
                e.preventDefault();
                onChange(value.filter((v: string) => v !== genre));
              }}
            />
          </Tag>
        ))}
      </div>
    </div>
  );
}
