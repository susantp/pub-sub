/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        hostApiUrl: process.env.API_BASE_URL,
        hostAuthUrl: process.env.API_AUTH_URL,
    }
}

module.exports = nextConfig