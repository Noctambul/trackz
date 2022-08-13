import TestingParagraph from "../Testing2/TestingParagraph";
import TestingTitle from "./TestingTitle";

export default function TestingComponent(): JSX.Element {
  return (
    <>
      <TestingTitle title={"Hello"} />
      <TestingParagraph content={"World"} />
    </>
  );
}
