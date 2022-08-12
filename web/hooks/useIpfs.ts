export const useIpfs = () => {
  const resolveLink = (url?: string) => {
    if (!url) return "";
    if (!url.includes("ipfs://")) return url;
    return url.replace("ipfs://", process.env.NEXT_PUBLIC_IPFS_PROVIDER_URI);
  };

  return { resolveLink };
};
