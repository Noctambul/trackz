import { Text } from "@chakra-ui/react";

export default function Test(): JSX.Element {
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <h1>Heading 1 Classic</h1>
        <h1 className="text-8xl text-red-400">Heading 1 Custom</h1>
        <h1 className="heading">Heading 1 Class</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>

        <Text as="h1">Text Heading 1</Text>
      </div>
    </>
  );
}
