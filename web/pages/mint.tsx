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

  console.log(formState.errors);
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
          <ErrorField propertyName="title" label="Title" />
        </label>

        <label>
          Description
          <textarea {...register("description")} />
          <ErrorField propertyName="description" label="Description" />
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
              valueAsNumber: true,
            })}
          />
          <ErrorField propertyName="editions" label="The number of editions" />
        </label>

        <label>
          Royalties
          <input
            type="number"
            max="20"
            {...register("royalties", {
              required: true,
              max: { value: 20, message: "Royalties must be less than 20%" },
            })}
          />
          <ErrorField propertyName="royalties" label="Royalties" />
        </label>

        <button className="rounded-xl bg-primary p-2" type="submit">
          Mint
        </button>
      </form>
    </PageContainer>
  );
}
