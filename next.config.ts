
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Firebase App Hosting builds in standalone mode, which only copies public/
  // files that Next's tracer pulls in. Without this, any image not read via fs
  // in server code is dropped from the deploy and 404s in production. Force the
  // whole public/ folder into the standalone bundle for every route.
  outputFileTracingIncludes: {
    '/**': ['./public/**/*'],
  },
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

    