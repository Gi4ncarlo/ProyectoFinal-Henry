import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'res.cloudinary.com', 'lh3.googleusercontent.com'],
  },
};

export default nextConfig;
