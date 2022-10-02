import EthWalletAddressSchema from "lib/schema/eth-wallet-address-schema";

export function formatWallet(wallet: string | undefined): string {
  if (!wallet || !Boolean(wallet)) return "";
  const parsed = EthWalletAddressSchema.safeParse(wallet);
  return parsed.success
    ? `${parsed.data.substring(0, 5)}...${parsed.data.substring(
        parsed.data.length - 4
      )}`
    : wallet;
}
