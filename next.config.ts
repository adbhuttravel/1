
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // This will prevent the build from failing if generateStaticParams
    // encounters an error, for example, if the database is not available.
    // Pages will be generated on-demand instead.
    generateStaticParams: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'adbhuttravel.in',
      },
      {
        protocol: 'https',
        hostname: 'www.adbhuttravel.in',
      }
    ],
  },
};

export default nextConfig;

    