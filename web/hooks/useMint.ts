import {
  ChainId,
  useAddress,
  useEdition,
  useNetwork,
  useNetworkMismatch,
  useSigner,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { trackzEditionContract } from "lib/environment";
import { MintBodyResponse } from "pages/api/mint";
import { MintInputs } from "pages/mint";
import { useState } from "react";

export default function useMint() {
  const [isLoading, setIsLoading] = useState(false);
  const contract = useEdition(trackzEditionContract);
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const signer = useSigner();
  const [, switchNetwork] = useNetwork();

  const mintWithSignature = async ({
    name,
    description,
    musicFile,
    coverFile,
  }: MintInputs) => {
    if (!address || !signer) throw new Error("Wallet not connected");
    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(ChainId.Rinkeby);
      return;
    }
    if (musicFile.length !== 1) throw new Error("Should only mint one music");
    if (coverFile && coverFile.length !== 1)
      throw new Error("Should only have one cover image");

    try {
      // Upload files on IPFS
      const sdk = new ThirdwebSDK(signer);
      const uploadPromises = [sdk.storage.upload(musicFile[0])];
      if (coverFile) uploadPromises.push(sdk.storage.upload(coverFile[0]));
      const [uploadedMusic, uploadedCover] = await Promise.all(uploadPromises);

      console.log("Files uploaded ", uploadedMusic, uploadedCover);

      // Request API
      const payload: MintBodyResponse = {
        authorAddress: address,
        metadata: {
          name,
          description,
          uploadedMusic,
          uploadedCover,
        },
      };
      const signedPayloadReq = await fetch("/api/mint", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      console.log("Received Signed payload", signedPayloadReq);
    } catch (e) {
      console.error("An error occurred trying to mint the Trackz:", e);
    }
  };

  const mint = async (data: MintInputs) => {
    if (!address || isLoading) return;

    setIsLoading(true);
    const metadata = {
      name: data.name,
      description: data.description || "",
      image: data.coverFile?.[0] || "",
      animation_url: data.musicFile[0],
      attributes: [
        { trait_type: "creator", value: address },
        { trait_type: "tags", value: data.tags || "" },
      ],
    };

    const tx = await contract?.mintTo(address, {
      metadata,
      supply: data.supply.toString(),
    });
    console.log("Receipt: ", tx?.receipt);
    console.log("TokenId: ", tx?.id);
    const nft = await tx?.data();
    setIsLoading(false);
  };

  return { mint, isLoading };
}
