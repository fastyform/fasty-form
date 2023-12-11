/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  redirects: async () => [
    { source: '/', destination: '/submissions', permanent: false },
    { source: '/register', destination: '/register/client', permanent: false },
  ],
  images: {
    domains: ['localhost'],
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
