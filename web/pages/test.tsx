import TagSelector from "common/components/uikit/TagSelector";
import { MusicalGenres } from "lib/schema/edition-metadata-schema";
import { useState } from "react";

export default function Test(): JSX.Element {
  const [genres, setGenres] = useState<string[]>(["electro"]);

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <TagSelector
          options={MusicalGenres}
          values={genres}
          onChange={setGenres}
        />
      </div>
    </>
  );
}
