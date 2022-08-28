import PageContainer from "components/PageContainer/PageContainer";
import FileInput from "components/uikit/FileInput";
import useErrorFields from "hooks/useErrorFields";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  musicFile: File;
  coverFile: File;
  title: string;
  description: string;
  tags: string;
  editions: number;
  royalties: number;
};

export default function MintPage(): JSX.Element {
  const { handleSubmit, register, formState } = useForm<Inputs>();
  const { ErrorField } = useErrorFields<Inputs>(formState);
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <PageContainer>
      <form
        className="mx-40 flex w-full flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3>Upload</h3>

        <FileInput>Music File</FileInput>

        <label>
          Cover file
          <input type="file" name="coverFile" />
        </label>

        <h3>Details</h3>

        <label>
          Title
          <input type="text" {...register("title", { required: true })} />
          <ErrorField propertyName="title">Title is required</ErrorField>
        </label>

        <label>
          Description
          <textarea {...register("description")} />
          <ErrorField propertyName="description">
            Description is required
          </ErrorField>
        </label>

        <label>
          Tags
          <input type="text" name="tags" />
        </label>

        <h3>Editions</h3>

        <label>
          Number of Editions
          <input
            type="number"
            placeholder="10"
            {...register("editions", {
              required: true,
              min: 1,
              max: 100000,
              pattern: /[0-9]*/,
            })}
          />
          <ErrorField propertyName="editions">
            The number of edition is required
          </ErrorField>
        </label>

        <label>
          Royalties
          <input
            type="number"
            {...register("royalties", { required: true, max: 20 })}
          />
          <ErrorField propertyName="royalties">
            Royalties is required
          </ErrorField>
        </label>

        <button className="rounded-xl bg-primary p-2" type="submit">
          Mint
        </button>
      </form>
    </PageContainer>
  );
}
