import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true, // Esto le dice a Google que la página principal ahora es /blog (bueno para SEO)
      },
    ];
  },
};

export default nextConfig;