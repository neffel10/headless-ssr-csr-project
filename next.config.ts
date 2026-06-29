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
  // AGREGA ESTA CONFIGURACIÓN:
  images: {
    //unoptimized: true, //AÑADE ESTO TEMPORALMENTE para local errors
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'espaciopsicologico.mx', // El dominio de tu WordPress
      },
    ],
  },
};

export default nextConfig;