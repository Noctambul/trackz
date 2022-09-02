import { useAddress, useEdition } from "@thirdweb-dev/react";
import { MintInputs } from "pages/mint";
import { useState } from "react";

export default function useMint() {
  const [isLoading, setIsLoading] = useState(false);
  const contract = useEdition(process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT);
  const address = useAddress();

  const mint = async (data: MintInputs) => {
    if (!address || isLoading) return;

    setIsLoading(true);
    const metadata = {
      name: data.title,
      description: data.description,
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
