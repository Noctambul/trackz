import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import PageContainer from "common/components/PageContainer/PageContainer";
import TagSelector from "common/components/uikit/TagSelector";
import { MusicalGenres } from "lib/schema/edition-metadata-schema";
import {
  default as MintFormSchema,
  MintInputs,
} from "lib/schema/mint-form-schema";
import { useWeb3 } from "modules/web3/context/Web3Context";
import useTezosMint from "modules/web3/hooks/useTezosMint";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function MintPage(): JSX.Element {
  const { address, connectWallet, refetchTrackzs } = useWeb3();
  const { mint, currentStateLabel } = useTezosMint(address);
  const toast = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MintInputs>({
    mode: "onChange",
    resolver: zodResolver(MintFormSchema),
  });

  const onSubmit: SubmitHandler<MintInputs> = async (data) => {
    try {
      await mint(data);
      refetchTrackzs();

      await router.push("/");
      toast({
        id: "mint-succeed",
        title: "Mint succeed",
        description: `${data.name} is now available on the plateform`,
        status: "success",
        duration: 10000,
        isClosable: true,
        position: "top",
      });
    } catch (e) {
      console.error(e);
      toast({
        id: "mint-failed",
        title: "Mint failed",
        description: `Impossible to mint ${data.name}, please try again`,
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const SubmitButton = address ? (
    <Button
      type="submit"
      isLoading={isSubmitting}
      loadingText={`${currentStateLabel} ...`}
      mt={8}
      aria-label="Mint"
    >
      Mint
    </Button>
  ) : (
    <Button
      type="button"
      onClick={connectWallet}
      mt={8}
      aria-label="Connect wallet"
    >
      Connect wallet
    </Button>
  );

  return (
    <PageContainer>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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

        <FormControl isInvalid={!!errors.coverFile} isDisabled={isSubmitting}>
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

        <FormControl isInvalid={!!errors.genres} isDisabled={isSubmitting}>
          <FormLabel>Musical Genres</FormLabel>
          <Controller
            control={control}
            name="genres"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TagSelector
                options={MusicalGenres}
                onChange={onChange}
                value={value}
              />
            )}
          />
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
          </NumberInput>
          <FormHelperText>in percentage (%)</FormHelperText>
          <FormErrorMessage>
            {errors.royalties?.message as string}
          </FormErrorMessage>
        </FormControl>

        {SubmitButton}
      </form>
      <button onClick={mint}>Test Mint</button>
    </PageContainer>
  );
}
