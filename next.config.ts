import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol:"https",
        hostname: "uploadthing.com"
      },
      {
        protocol:"https",
        hostname: "drive.google.com"
      },
      {
        protocol:"https",
        hostname: "storage.googleapis.com"
      },
      {
        protocol:"https",
        hostname: "source.unsplash.com"
      },
      {
        protocol:"https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol:"https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com"
      }

    ]
  }
};

export default nextConfig;
