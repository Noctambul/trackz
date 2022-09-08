import { zodResolver } from "@hookform/resolvers/zod";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import PageContainer from "components/PageContainer/PageContainer";
import Button from "components/uikit/Button";
import useMint from "hooks/useMint";
import { PropsWithChildren } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const AlertInput = ({ children }: PropsWithChildren<{}>) =>
  Boolean(children) ? (
    <span role="alert" className="text-red-500">
      {children}
    </span>
  ) : null;

const MintFormSchema: z.ZodSchema<any, z.ZodTypeDef, any> = z.object({
  musicFile: z.any(),
  coverFile: z.any().optional(),
  name: z
    .string({ invalid_type_error: "The title is mandatory" })
    .min(1, { message: "It is required" })
    .max(30),
  description: z.string().optional(),
  tags: z.string().optional(),
  supply: z.preprocess(
    (str) => parseInt(str as string, 10),
    z.number().int().positive()
  ),
  royalties: z.preprocess(
    (str) => parseInt(str as string, 10),
    z.number().int().nonnegative().max(20)
  ),
});

export type MintInputs = z.infer<typeof MintFormSchema>;

const SimpleSchema = z.object({
  name: z.string(),
  age: z.number(),
});

export default function MintPage(): JSX.Element {
  const { handleSubmit, register, formState } = useForm({
    // resolver: zodResolver(SimpleSchema),
  });
  // const { ErrorField } = useErrorFields<MintInputs>(formState);

  const { mintWithSignature } = useMint();
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  const isSubmitting = formState.isSubmitting;
  const onSubmit: SubmitHandler<MintInputs> = async (data) => {
    // TODO: transition after mint
    console.log("MINT");
    await mintWithSignature(data);
  };

  // console.log(formState);

  const SubmitButton = address ? (
    <Button
      type="submit"
      loadingText="Minting ..."
      isDisabled={isSubmitting}
      isLoading={isSubmitting}
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
          <input
            type="file"
            {...register("musicFile")}
            disabled={isSubmitting}
          />
          {/* <ErrorField propertyName="musicFile" label="Music file" /> */}
        </label>
        <label>
          Cover File
          <input
            type="file"
            {...register("coverFile")}
            disabled={isSubmitting}
          />
        </label>
        <h3>Details</h3>
        <label>
          Title
          <input type="text" {...register("name")} disabled={isSubmitting} />
          {/* {formState.errors.name?.message && (
            <p className="text-red-500">{formState.errors.name?.message}</p>
          )} */}
          {/* <AlertInput>{formState.errors?.name?.message}</AlertInput> */}
          {/* <ErrorField propertyName="title" label="Title" /> */}
        </label>
        <label>
          Description
          <textarea {...register("description")} disabled={isSubmitting} />
          {/* <ErrorField propertyName="description" label="Description" /> */}
        </label>
        <label>
          Tags
          <input type="text" {...register("tags")} disabled={isSubmitting} />
          {/* <ErrorField propertyName="tags" label="Tags" /> */}
        </label>
        <h3>Editions</h3>
        <label>
          Number of Editions
          <input
            type="number"
            placeholder="10"
            {...register("supply")}
            disabled={isSubmitting}
          />
          {/* <ErrorField propertyName="supply" label="The number of editions" /> */}
        </label>
        <label>
          Royalties
          <input
            type="number"
            max="20"
            {...register("royalties")}
            disabled={isSubmitting}
          />
          {/* <ErrorField propertyName="royalties" label="Royalties" /> */}
        </label>
        {SubmitButton}
      </form>
    </PageContainer>
  );
}
