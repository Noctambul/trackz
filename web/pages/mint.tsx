import {
  useAddress,
  useContract,
  useMetamask,
  useMintNFT,
} from "@thirdweb-dev/react";
import PageContainer from "components/PageContainer/PageContainer";
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

  const { contract } = useContract(
    process.env.NEXT_PUBLIC_TRACKZ_COLLECTION_CONTRACT
  );
  const { mutate: mintNft, isLoading, error } = useMintNFT(contract?.nft);
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  if (error) {
    console.error("failed to mint nft", error);
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    if (!address) return;

    // mintNft({
    //   to: address,
    //   metadata: { name: "bonjour", description: "salut" },
    // });
  };

  const SubmitButton = address ? (
    <button
      className="rounded-xl bg-primary p-2 disabled:bg-subtext"
      type="submit"
      // disabled={isLoading}
    >
      MINT
    </button>
  ) : (
    <button
      className="rounded-xl bg-orange-700 p-2 disabled:bg-subtext"
      type="button"
      onClick={connectWithMetamask}
    >
      Connect wallet
    </button>
  );

  return (
    <PageContainer>
      <form
        className="mx-40 flex w-full flex-col gap-4"
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
        ackage
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
        {SubmitButton}
      </form>
    </PageContainer>
  );
}
