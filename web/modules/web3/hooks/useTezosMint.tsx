import useEnvironment from "common/hooks/useEnvironment";
import { MintInputs } from "lib/schema/mint-form-schema";
import { NFTStorage } from "nft.storage";
import { useState } from "react";

export default function useTezosMint() {
  const { nftStorageApiKey } = useEnvironment();
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
  }

  async function mint(inputs: MintInputs): Promise<void> {
    setCurrentStateLabel("Uploading metadata to IPFS");
    await storeMetadata(inputs);
    setCurrentStateLabel("Minting...");
  }

  return { mint, currentStateLabel };
}
