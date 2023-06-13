/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: [
      "api.baseuniverse.space",
      "baseuniverse.space",
      "baseuniverse.space/api",
      "baseuniverse.space",
      "www.baseuniverse.space",
    ],
  },
};

module.exports = nextConfig;
