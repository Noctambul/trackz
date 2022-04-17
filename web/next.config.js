const withLess = require("next-with-less");

/** @type {import('next').NextConfig} */
const nextConfig = withLess({
  lessLoaderOptions: {},
  reactStrictMode: true,
  images: {
    domains: ["gateway.moralisipfs.com", "gateway.ipfscdn.io"],
  },
});

module.exports = nextConfig;
