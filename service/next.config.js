/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    hostApiUrl: process.env.REACT_APP_API_BASE_URL,
    hostAuthUrl: process.env.REACT_APP_API_AUTH_URL,
  }
}

module.exports = nextConfig