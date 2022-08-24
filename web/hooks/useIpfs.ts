export function resolveLink(url?: string) {
  if (!url) return "";
  if (!url.includes("ipfs://")) return url;
  return url.replace("ipfs://", process.env.NEXT_PUBLIC_IPFS_PROVIDER_URI);
}

export function useIpfs() {
  return { resolveLink };
}
