import dotenv from 'dotenv';
import { createClient } from '@sanity/client';  // Only import it once
import path from 'path';
import fs from 'fs';

// Manually resolve the path to .env.local in the root directory of the project
const rootDir = process.cwd();  // Get the current working directory (should be your project root)

console.log("Current working directory:", rootDir);

// Define the path to the .env.local file located in the root directory
const envPath = path.resolve(rootDir, '.env.local'); // Ensure it points to the root directory

console.log('Path to .env.local:', envPath);

// Check if the .env.local file exists at the root
if (!fs.existsSync(envPath)) {
  console.error(`.env.local not found at ${envPath}. Please ensure it's in the root of your project.`);
  process.exit(1);  // Exit the script if the file does not exist
}

// Load the environment variables from the .env.local file in the root directory
dotenv.config({ path: envPath });

// Output the loaded environment variables to verify
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
  console.error('Missing required environment variables. Please check your .env.local file.');
  process.exit(1);  // Exit if any environment variable is missing
}

// Create the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN,
  useCdn: false, // Use fresh data
  apiVersion: '2021-08-31', // Specify API version
});

// Sample customer data (you can modify or load this dynamically)
 export const  customerData = {
  email: 'anas@gmail.com',
  password: 'hackathon3',
  name: 'Anas Maududi',
};

// Function to sanitize email to create a valid ID for Sanity
function sanitizeEmailForId(email) {
  return email.replace(/[^a-zA-Z0-9_-]/g, '-');  // Replace non-alphanumeric characters with hyphens
}

// Function to add the customer to Sanity
async function addCustomer() {
  try {
    const customerId = sanitizeEmailForId(customerData.email); // Sanitize email to create valid ID
    const result = await client.createOrReplace({
      _type: 'customer',
      _id: `customer-${customerId}`,  // Unique ID based on the sanitized email
      email: customerData.email,
      password: customerData.password,
      name: customerData.name,
    });

    console.log('Customer added/updated successfully:', result);
  } catch (error) {
    console.error('Error adding customer:', error);
  }
}

// Run the script
addCustomer();
