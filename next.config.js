/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { 
    domains: ['google.com','res.cloudinary.com'],
  }
}

module.exports = nextConfig
