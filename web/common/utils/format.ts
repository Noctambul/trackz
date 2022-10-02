export function formatWallet(wallet: string | undefined): string {
  if (!wallet || !Boolean(wallet)) return "";
  return `${wallet.substring(0, 5)}...${wallet.substring(wallet.length - 4)}`;
}
