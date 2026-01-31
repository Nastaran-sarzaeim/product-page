/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: ['**/.git/**'],
    }
    return config
  },
}

export default nextConfig
