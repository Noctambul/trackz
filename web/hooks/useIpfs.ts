export const useIpfs = () => {
  const resolveLink = (url: string) => {
    if (!url || !url.includes("ipfs://")) return url;
    console.log("ENV : ", process.env.NEXT_PUBLIC_IPFS_PROVIDER_URI);
    return url.replace("ipfs://", process.env.NEXT_PUBLIC_IPFS_PROVIDER_URI);
  };

  return { resolveLink };
};
