/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://res.cloudinary.com/cloudinarymich/',
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
