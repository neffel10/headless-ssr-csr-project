// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
  
  images: {
    //unoptimized: true, //ADD THIS LINE TO DISABLE IMAGE OPTIMIZATION
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'espaciopsicologico.mx', 
      },
    ],
  },
};

export default nextConfig;