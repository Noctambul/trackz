import { TezosToolkit } from "@taquito/taquito";
import useEnvironment from "common/hooks/useEnvironment";
import { MintInputs } from "lib/schema/mint-form-schema";
import { NFTStorage } from "nft.storage";
import { useState } from "react";

export default function useTezosMint(wallet?: string) {
  const { nftStorageApiKey, raribleTrackzContract } = useEnvironment();
  const [currentStateLabel, setCurrentStateLabel] = useState("Preparing data");

  async function storeMetadata({
    name,
    description,
    musicFile,
    coverFile,
    royalties,
    supply,
    tags,
    genres,
  }: MintInputs) {
    const nft = {
      name,
      description,
      animation_url: musicFile[0],
      image: coverFile[0],
      properties: {
        creators: [],
        tags,
        genres,
      },
    };

    const client = new NFTStorage({ token: nftStorageApiKey });
    const metadata = await client.store(nft);

    console.log(metadata);
    console.log("NFT data stored at " + metadata.url);

    return metadata;
  }

  async function mint(inputs: MintInputs): Promise<void> {
    setCurrentStateLabel("Uploading metadata to IPFS");
    // const metadata = await storeMetadata(inputs);

    setCurrentStateLabel("Minting...");

    const Tezos = new TezosToolkit("https://rpc.tzbeta.net/");
    try {
      const contract = await Tezos.contract.at(raribleTrackzContract);
      const methods = contract.parameterSchema.ExtractSignatures();
      console.log(JSON.stringify(methods, null, 2));
    } catch (e) {
      console.error(e);
    }
  }

  return { mint, currentStateLabel };
}
