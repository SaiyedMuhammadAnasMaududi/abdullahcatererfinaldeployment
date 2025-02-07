import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@sanity/client';
import axios from 'axios';

// Resolve the path to the .env.local file in the root directory
const envPath = path.resolve(process.cwd(), '.env.local');

// Check if .env.local exists
if (!fs.existsSync(envPath)) {
  console.error(`Error: .env.local file not found at path: ${envPath}`);
  process.exit(1);
}

// Load environment variables from .env.local in the root
dotenv.config({ path: envPath });
console.log('Loaded environment variables:', {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN,
});

// Ensure all required environment variables are set
if (
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_SANITY_DATASET ||
  !process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN
) {
  console.error(
    `Missing required environment variables. Please check your .env.local file. Expected variables:
    - NEXT_PUBLIC_SANITY_PROJECT_ID
    - NEXT_PUBLIC_SANITY_DATASET
    - NEXT_PUBLIC_SANITY_AUTH_TOKEN`
  );
  process.exit(1);
}

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN,
  apiVersion: '2021-08-31',
});

// Function to read JSON files
function readJsonFile(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    console.log(`Reading file from: ${fullPath}`);
    const rawData = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading JSON file: ${filePath}`);
    console.error(error);
    return [];
  }
}

// Function to upload image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image from URL: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');
    const imageAsset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imageUrl),
    });
    console.log(`Image uploaded successfully: ${imageAsset._id}`);
    return imageAsset._id;
  } catch (error) {
    console.error(`Error uploading image: ${imageUrl}`, error);
    return null;
  }
}

// Reusable function to process data
async function processData(data, type) {
  for (const item of data) {
    console.log(`Processing ${type}: ${item.name}`);

    // Include the 'id' if it's present in the JSON data
    const sanityItem = {
      _type: type,
      _id: `customId-${item.id}`, // Prefix to avoid any conflict, and map JSON id to Sanity _id
      name: item.name,
      details: item.details,
      price: item.price,
      location: item.location || undefined,
      availability: item.availability || undefined,
      image: item.image
        ? {
            _type: 'image',
            asset: { _type: 'reference', _ref: await uploadImageToSanity(item.image) },
          }
        : undefined,
    };

    try {
      const result = await client.createOrReplace(sanityItem); // Ensure ID is handled with createOrReplace
      console.log(`${type} uploaded successfully: ${result._id}`);
    } catch (error) {
      console.error(`Error uploading ${type}: ${item.name}`, error);
    }
  }
}

// Main function to import data
async function importData() {
  try {
    console.log('Reading data from JSON files...');
    const decorations = readJsonFile('decorations.json');
    const catering = readJsonFile('catering.json');
    const consultancyManagers = readJsonFile('consultancy.json');
    const reservingDestinations = readJsonFile('destination.json');

    await processData(decorations, 'decoration');
    await processData(catering, 'catering');
    await processData(consultancyManagers, 'consultancyManager');
    await processData(reservingDestinations, 'reservingDestination');

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

// Start the data import process
importData();
