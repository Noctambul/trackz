import { useAddress, useMetamask } from "@thirdweb-dev/react";
import PageContainer from "components/PageContainer/PageContainer";
import Button from "components/uikit/Button";
import useErrorFields from "hooks/useErrorFields";
import useMint from "hooks/useMint";
import { SubmitHandler, useForm } from "react-hook-form";

export type MintInputs = {
  musicFile: FileList;
  coverFile?: FileList;
  name: string;
  description?: string;
  tags?: string;
  supply: number;
  royalties: number;
};

export default function MintPage(): JSX.Element {
  const { handleSubmit, register, formState } = useForm<MintInputs>();
  const { ErrorField } = useErrorFields<MintInputs>(formState);

  const { mint, isLoading } = useMint();
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  const onSubmit: SubmitHandler<MintInputs> = async (data) => {
    // TODO: transition after mint
    mint(data);
  };

  const SubmitButton = address ? (
    <Button
      type="submit"
      loadingText="Minting ..."
      isDisabled={isLoading}
      isLoading={isLoading}
    >
      MINT
    </Button>
  ) : (
    <Button type="button" onClick={connectWithMetamask}>
      Connect wallet
    </Button>
  );

  return (
    <PageContainer>
      <form
        className="mx-6 flex w-full flex-col gap-4 md:mx-40"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3>Upload</h3>
        <label>
          Music File
          <input type="file" {...register("musicFile", { required: true })} />
          <ErrorField propertyName="musicFile" label="Music file" />
        </label>
        <label>
          Cover File
          <input type="file" {...register("coverFile")} />
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
          <input type="text" {...register("tags")} />
          <ErrorField propertyName="tags" label="Tags" />
        </label>
        <h3>Editions</h3>
        <label>
          Number of Editions
          <input
            type="number"
            placeholder="10"
            {...register("supply", {
              required: false,
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
              required: false,
              max: { value: 20, message: "Royalties must be less than 20%" },
            })}
          />
          <ErrorField propertyName="royalties" label="Royalties" />
        </label>
        {SubmitButton}
      </form>
    </PageContainer>
  );
}
