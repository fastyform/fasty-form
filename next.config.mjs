/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    typedRoutes: true,
  },
  redirects: async () => [
    { source: '/register', destination: '/register/client', permanent: false },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'veknudpszbrjutmcmrwk.supabase.co',
        port: '',
      },
      {
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
