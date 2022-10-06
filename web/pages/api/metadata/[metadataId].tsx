import { NextApiRequest, NextApiResponse } from "next";
import isInt from "validator/lib/isInt";
import { z } from "zod";

const QueryParamsSchema = z.object({
  metadataId: z
    .string()
    .refine(isInt, { message: "The metadata id should be an integer" })
    .transform((id) => parseInt(id)),
});

// https://gateway.ipfscdn.io/ipfs/QmYbwtSWZg7tJknZgWm6oq8en18qrFMg9KxabHhnBwzpET/0

export default function MetadataRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { metadataId } = QueryParamsSchema.parse(req.query);
  res.json({
    name: "Hello name",
    artist: "0x56150dB289BeF563De0018Fe43abF8dCF1725F3e",
    description: "Hello description",
    image:
      "https://gateway.ipfscdn.io/ipfs/QmduVvMrjdKiTidawfuAVUgqdFQRv5RKEGxsZPbtvEHTHL/red-triangle.gif",
    external_url: "https://trackz.vercel.app/api/metadata/" + metadataId,
    attributes: [
      {
        trait_type: "Grade",
        value: "N/A",
      },
      {
        trait_type: "Artwork Type",
        value: "Digital",
      },
      {
        display_type: "ranking",
        trait_type: "Prints",
        value: "1",
      },
      {
        display_type: "number",
        trait_type: "Last Sold For",
        value: 0,
      },
      {
        trait_type: "Physical Representation",
        value: false,
      },
      {
        trait_type: "Artist",
        value: "kamisama",
      },
    ],
  });
}
