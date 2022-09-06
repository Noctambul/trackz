import { ipfsProviderUri } from "lib/environment";

export function isValidUri(url?: string | null): boolean {
  return (
    url !== undefined &&
    url !== null &&
    (url.includes("ipfs://") ||
      url.includes("http://") ||
      url.includes("https://"))
  );
}

export function resolveLink(url?: string | null) {
  if (!url || !isValidUri(url)) return "";
  if (!url.includes("ipfs://")) return url;
  return url.replace("ipfs://", ipfsProviderUri);
}

export function useIpfs() {
  return { resolveLink, isValidUri };
}
