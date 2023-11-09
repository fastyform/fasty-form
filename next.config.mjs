/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'veknudpszbrjutmcmrwk.supabase.co',
        port: '',
      },
    ],
  },
};

export default nextConfig;
