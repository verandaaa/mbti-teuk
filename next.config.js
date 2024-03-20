/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/list",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_STORAGE_DOMAIN],
  },
};

module.exports = nextConfig;
