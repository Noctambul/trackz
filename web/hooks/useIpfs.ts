import { ipfsProviderUri } from "lib/environment";

export function resolveLink(url?: string | null) {
  if (!url) return "";
  if (!url.includes("ipfs://")) return url;
  return url.replace("ipfs://", ipfsProviderUri);
}

export function useIpfs() {
  return { resolveLink };
}
