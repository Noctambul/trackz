import { ipfsProviderUri } from "lib/environment";

export function isValidUri(url?: string | null): boolean {
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?~]/;
  return url !== undefined && url !== null && format.test(url);
}

export function resolveLink(url?: string | null) {
  if (!url || !isValidUri(url)) return "";
  if (!url.includes("ipfs://")) return url;
  return url.replace("ipfs://", ipfsProviderUri);
}

export function useIpfs() {
  return { resolveLink, isValidUri };
}
