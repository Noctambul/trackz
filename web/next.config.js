/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "gateway.moralisipfs.com",
      "gateway.ipfscdn.io",
      "gateway.pinata.cloud",
      "placeholder.com",
      "via.placeholder.com",
      "picsum.photos",
    ],
  },
  env: {
    NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT:
      process.env.NEXT_PUBLIC_TRACKZ_EDITION_CONTRACT,
  },
};

module.exports = nextConfig;
