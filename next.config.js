/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "basehub.earth",
      },
    ],
  },
};

module.exports = nextConfig;
