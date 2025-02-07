import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.shutterstock.com","d1csarkz8obe9u.cloudfront.net","img.dunyanews.tv","hips.hearstapps.com","pyaraskardu.com","blog.thomascook.in","d1csarkz8obe9u.cloudfront.net", "${parsedSrc.hostname}"], // Allow images from Shutterstock
  },
  
};
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
},
env: {
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET:process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_AUTH_TOKEN:process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN
},
}


export default nextConfig;
