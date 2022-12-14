/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
      domains:['api.geoapify.com']
    },
    reactStrictMode: true,
    publicRuntimeConfig: {
        hostApiUrl: process.env.API_BASE_URL,
        hostAuthUrl: process.env.API_AUTH_URL,
    },

}

module.exports = nextConfig