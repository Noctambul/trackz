import { BigNumber } from "ethers";
import { z } from "zod";

const BigNumberSchema = z.preprocess(
  (big) => BigNumber.from(big),
  z.instanceof(BigNumber).transform((big) => big.toNumber())
);

export default BigNumberSchema;
