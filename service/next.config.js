/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
      domains:['api.geoapify.com']
    },
    reactStrictMode: true,
    publicRuntimeConfig: {
        userType: process.env.USER_TYPE,
        hostApiUrl: process.env.API_BASE_URL,
        hostAuthUrl: process.env.API_AUTH_URL,
    },

}

module.exports = nextConfig