/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return { ...config, optimization: { minimize: false } };
  },
};

module.exports = nextConfig;
