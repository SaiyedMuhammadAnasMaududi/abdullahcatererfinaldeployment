import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "rdinm6by", // Replace with your actual Project ID
  dataset: "production", // or another dataset if applicable
  useCdn: true, // `true` makes the response faster but might be stale
  apiVersion: "2023-01-01", // Use the latest API version
  token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN, // If you're using authentication
});
