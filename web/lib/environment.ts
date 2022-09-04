function getEnv(variableName: string): string {
  const variable = process.env[variableName];
  if (variable === undefined)
    throw `The environment variable ${variableName} is not set`;
  return variable;
}

export const trackzEditionContract = getEnv(
  "NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT"
);
export const ipfsProviderUri = getEnv("NEXT_PUBLIC_IPFS_PROVIDER_URI");
