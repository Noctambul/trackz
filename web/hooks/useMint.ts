import {
  ChainId,
  useAddress,
  useEdition,
  useNetwork,
  useNetworkMismatch,
  useSigner,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { MintInputs } from "lib/schema/mint-form-schema";
import { MintParams } from "lib/schema/mint-params-schema";
import { useState } from "react";
import useEnvironment from "./useEnvironment";

export default function useMint() {
  const [isLoading, setIsLoading] = useState(false);
  const { trackzEditionContract } = useEnvironment();
  const contract = useEdition(trackzEditionContract);
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const signer = useSigner();
  const [, switchNetwork] = useNetwork();
  const [currentStateLabel, setCurrentStateLabel] = useState("");

  const mintWithSignature = async ({
    name,
    description,
    musicFile,
    coverFile,
    royalties,
    supply,
  }: MintInputs) => {
    if (isLoading) return;
    if (!address || !signer) throw new Error("Wallet not connected");
    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(ChainId.Rinkeby);
      return;
    }

    setIsLoading(true);
    const hasCover = coverFile && coverFile.length > 0;

    try {
      // Upload files on IPFS
      setCurrentStateLabel("Uploading file on IPFS");
      const sdk = new ThirdwebSDK(signer);
      const uploadPromises = [sdk.storage.upload(musicFile[0])];
      if (hasCover) uploadPromises.push(sdk.storage.upload(coverFile[0]));
      const [uploadedMusic, uploadedCover] = await Promise.all(uploadPromises);

      console.log("Files uploaded ", uploadedMusic, uploadedCover);

      // Request API
      setCurrentStateLabel("Signing payload");
      const payload: MintParams = {
        authorAddress: address,
        supply,
        royalties,
        metadata: {
          name,
          description,
          musicUri: uploadedMusic.uris[0],
          coverUri: uploadedCover?.uris[0],
        },
      };
      const signedPayloadReq = await fetch("/api/mint", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      console.log("Received Signed payload", signedPayloadReq);

      // Grab the JSON from the response
      const json = await signedPayloadReq.json();

      console.log("Json:", json);

      // If the request failed, we'll show an error.
      if (!signedPayloadReq.ok) {
        throw new Error("Impossible to sign the payload ", json.error);
      }

      setCurrentStateLabel("Minting");

      // If the request succeeded, we'll get the signed payload from the response.
      // The API should come back with a JSON object containing a field called signedPayload.
      // This line of code will parse the response and store it in a variable called signedPayload.
      const signedPayload = json.signedPayload;

      // Now we can call signature.mint and pass in the signed payload that we received from the server.
      // This means we provided a signature for the user to mint an NFT with.
      const nft = await contract?.signature.mint(signedPayload);

      console.log("Successfully minted NFT with signature", nft);

      alert("Successfully minted NFT with signature");

      return nft;
    } catch (e) {
      console.error("An error occurred while trying to mint:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const mint = async (data: MintInputs) => {
    if (isLoading || !address || isLoading) return;

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

  return { mintWithSignature, isLoading, currentStateLabel };
}
