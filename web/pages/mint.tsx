import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import PageContainer from "components/PageContainer/PageContainer";
// import Button from "components/uikit/Button";
import useMint from "hooks/useMint";
import { zodAudioFile, zodImageFile } from "lib/zod-helpers";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const MintFormSchema: z.ZodSchema<any, z.ZodTypeDef, any> = z.object({
  musicFile: zodAudioFile(),
  coverFile: zodImageFile().optional(),
  name: z
    .string()
    .min(1, { message: "Title is required" })
    .max(30, { message: "Title must contain at most 30 characters" }),
  description: z.string().optional(),
  tags: z.string().optional(),
  supply: z.preprocess(
    (str) => parseInt(str as string, 10),
    z.number().int().positive()
  ),
  royalties: z.preprocess(
    (str) => parseInt(str as string, 10),
    z
      .number()
      .int()
      .nonnegative()
      .max(20, { message: "Royalties must be less than 20%" })
  ),
});

export type MintInputs = z.infer<typeof MintFormSchema>;

export default function MintPage(): JSX.Element {
  const { mintWithSignature } = useMint();
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<MintInputs>({
    resolver: zodResolver(MintFormSchema),
  });

  const onSubmit: SubmitHandler<MintInputs> = async (data) => {
    // TODO: transition after mint
    console.log("MINT");
    await mintWithSignature(data);
  };

  const SubmitButton = address ? (
    <Button
      type="submit"
      isLoading={isSubmitting}
      loadingText="Minting ..."
      mt={8}
    >
      MINT
    </Button>
  ) : (
    <Button type="button" onClick={connectWithMetamask} mt={8}>
      Connect wallet
    </Button>
  );

  return (
    <PageContainer>
      <form
        className="mx-6 flex w-full flex-col gap-4 md:mx-40"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading as="h3" size="md">
          Upload
        </Heading>

        <FormControl
          isInvalid={!!errors.musicFile}
          isDisabled={isSubmitting}
          isRequired
        >
          <FormLabel>Music File</FormLabel>
          <Input type="file" {...register("musicFile")} p={0} />
          <FormErrorMessage>
            {errors.musicFile?.message as string}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.musicFile} isDisabled={isSubmitting}>
          <FormLabel>Cover File</FormLabel>
          <Input type="file" {...register("coverFile")} p={0} />
          <FormErrorMessage>
            {errors.coverFile?.message as string}
          </FormErrorMessage>
        </FormControl>

        <Heading as="h3" size="md" mt={8}>
          Details
        </Heading>

        <FormControl
          isInvalid={!!errors.name}
          isDisabled={isSubmitting}
          isRequired
        >
          <FormLabel>Title</FormLabel>
          <Input placeholder="Title" type="text" {...register("name")} />
          <FormErrorMessage>{errors.name?.message as string}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.description} isDisabled={isSubmitting}>
          <FormLabel>Description</FormLabel>
          <Textarea {...register("description")}></Textarea>
          <FormErrorMessage>
            {errors.description?.message as string}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.tags} isDisabled={isSubmitting}>
          <FormLabel>Tags</FormLabel>
          <Input type="text" {...register("tags")} />
          <FormErrorMessage>{errors.tags?.message as string}</FormErrorMessage>
        </FormControl>

        <Heading as="h3" size="md" mt={8}>
          Editions
        </Heading>

        <FormControl
          isInvalid={!!errors.supply}
          isDisabled={isSubmitting}
          isRequired
        >
          <FormLabel>Number of Editions</FormLabel>
          <NumberInput defaultValue={1} min={1}>
            <NumberInputField {...register("supply")} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>
            {errors.supply?.message as string}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors.royalties}
          isDisabled={isSubmitting}
          isRequired
        >
          <FormLabel>Royalties</FormLabel>
          <NumberInput defaultValue={0} min={0} max={20}>
            <NumberInputField {...register("royalties")} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>in percentage (%)</FormHelperText>
          <FormErrorMessage>
            {errors.royalties?.message as string}
          </FormErrorMessage>
        </FormControl>

        {SubmitButton}
      </form>
    </PageContainer>
  );
}
