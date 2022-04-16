/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["gateway.moralisipfs.com", "gateway.ipfscdn.io"],
  },
};

module.exports = nextConfig;
