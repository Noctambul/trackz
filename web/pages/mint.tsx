import PageContainer from "components/PageContainer/PageContainer";
import FileInput from "components/uikit/FileInput";

export default function MintPage(): JSX.Element {
  return (
    <PageContainer>
      <form className="mx-40 flex w-full flex-col gap-10">
        <h3>Upload</h3>

        {/* <label>
          Music file
          <input type="file" name="musicFile" />
        </label> */}

        <FileInput>Music File</FileInput>

        <label>
          Cover file
          <input type="file" name="coverFile" />
        </label>

        <h3>Details</h3>

        <label>
          Title
          <input type="text" name="title"></input>
        </label>

        <label>
          Description
          <textarea />
        </label>

        <label>
          Tags
          <input type="text" name="tags" />
        </label>

        <h3>Editions</h3>

        <label>
          Number of Editions
          <input type="number" name="numberOfEditions" placeholder="10" />
        </label>

        <label>
          Royalties
          <input type="number" name="royalties" />
        </label>
      </form>
    </PageContainer>
  );
}
