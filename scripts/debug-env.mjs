import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('Sanity Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('Sanity Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('Sanity Auth Token:', process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN);
