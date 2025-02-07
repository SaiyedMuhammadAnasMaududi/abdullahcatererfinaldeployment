// import { createClient } from "@sanity/client";
// import { notFound } from "next/navigation";
// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   useCdn: false,
// });

// const fetchCateringById = async (id: string) => {
//   const query = `*[_type == "catering" && _id == $id][0]{
//     _id,
//     name,
//     details,
//     price,
//     menu
//   }`;
//   return await client.fetch(query, { id });
// };

// export default async function CateringDetailPage({ params }: { params: { id: string } }) {
//   const catering = await fetchCateringById(params.id);

//   if (!catering) {
//     notFound();
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen font-sans">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-green-400 to-blue-500 py-16 text-white shadow-lg">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h1 className="text-4xl md:text-5xl font-extrabold">{catering.name}</h1>
//           <p className="text-lg mt-4">${catering.price}</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto mt-12 p-6 md:p-12 bg-white shadow-md rounded-lg">
//         {/* Catering Details */}
//         <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Details</h2>
//         <p className="text-gray-700 mt-4 text-lg leading-relaxed">{catering.details}</p>

//         {/* Menu List */}
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold text-gray-800">Menu:</h3>
//           {/* Check if menu exists and is an array */}
//           {catering.menu && Array.isArray(catering.menu) && catering.menu.length > 0 ? (
//             <ul className="space-y-3 text-gray-700 list-disc list-inside mt-4">
//               {catering.menu.map((item: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined, index: Key | null | undefined) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No menu available for this catering service.</p>
//           )}
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-blue-500 to-green-400 py-16 text-white mt-16">
//         <div className="max-w-6xl mx-auto text-center">
//           <h3 className="text-2xl font-bold">Interested in Booking?</h3>
//           <p className="mt-2 text-lg">
//             Contact us to book this catering service for your next event.
//           </p>
//           <button className="bg-white text-blue-600 px-6 py-3 mt-6 rounded-lg font-medium hover:bg-gray-200">
//             Contact Us
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/app/Home/details/[id]/page.tsx
import { createClient } from "@sanity/client";
import { use } from "react";
import AddToCartButton from "./addtocart";
 // Import the client component

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
});

const fetchCateringById = async (id: string) => {
  const query = `*[_type == "catering" && _id == $id][0]{
    _id,
    name,
    details,
    price,
    menu
  }`;
  return await client.fetch(query, { id });
};

export default function CateringDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Resolve params properly
  const catering = use(fetchCateringById(id)); // Fetch catering data

  if (!catering) {
    return <div>Catering item not found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 py-16 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">{catering.name}</h1>
          <p className="text-lg mt-4">${catering.price}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-12 p-6 md:p-12 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Details</h2>
        <p className="text-gray-700 mt-4 text-lg leading-relaxed">{catering.details}</p>

        {/* Add to Cart Button */}
        <div className="mt-8">
          <AddToCartButton
            catering={{
              id: catering._id,
              name: catering.name,
              price: catering.price,
            }}
          />
        </div>
      </div>
    </div>
  );
}
