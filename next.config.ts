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
}}


export default nextConfig;
