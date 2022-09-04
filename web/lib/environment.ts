// function getEnv(variableName: string): string {
//   console.log("Retrieve ", variableName);
//   const variable = process.env[variableName];
//   if (variable === undefined)
//     throw `The environment variable ${variableName} is not set`;
//   return variable;
// }

export const trackzEditionContract =
  process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT;
export const ipfsProviderUri = process.env.NEXT_PUBLIC_IPFS_PROVIDER_URI;
