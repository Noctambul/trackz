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
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import PageContainer from "components/PageContainer/PageContainer";
import { useWeb3 } from "context/Web3Context";
import useMint from "hooks/useMint";
import MintFormSchema, { MintInputs } from "lib/schema/mint-form-schema";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

export default function MintPage(): JSX.Element {
  const { mintWithSignature, currentStateLabel } = useMint();
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { refetchTrackzs } = useWeb3();
  const toast = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<MintInputs>({
    mode: "onChange",
    resolver: zodResolver(MintFormSchema),
  });

  const onSubmit: SubmitHandler<MintInputs> = async (data) => {
    try {
      const nft = await mintWithSignature(data);
      refetchTrackzs();

      await router.push("/");
      toast({
        id: "mint",
        title: "Mint succeed",
        description: `${nft.name} is now available on the plateform`,
        status: "success",
        duration: 10000,
        isClosable: true,
        position: "top",
      });
    } catch (e) {
      toast({
        id: "mint",
        title: "Mint failed",
        description: `Impossible to mint ${data.name}, please try again`,
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "top",
      });
      throw e;
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
      onClick={connectWithMetamask}
      mt={8}
      aria-label="Connect wallet"
    >
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

        <Button
          onClick={async () => {
            await router.push("/");
            toast({
              id: "mint",
              title: "Mint succeed",
              description: `Allow is now available on the plateform`,
              status: "success",
              duration: 10000,
              isClosable: true,
              position: "top",
            });
          }}
        >
          Test
        </Button>
      </form>
    </PageContainer>
  );
}
