/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  images: { unoptimized: true },
  experimental: { optimizePackageImports: ["lucide-react"] },
  async redirects() {
    return [
      { source: "/packages", destination: "/", permanent: true },
      { source: "/order", destination: "/", permanent: true },
    ];
  },
};
export default nextConfig;
