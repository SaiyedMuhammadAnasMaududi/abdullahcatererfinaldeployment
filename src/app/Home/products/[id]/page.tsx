// // app/decorations/[id]/page.tsx
// "use client";
// import { createClient } from "@sanity/client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// // Define the Decoration type
// interface Decoration {
//   _id: string;
//   name: string;
//   details: string;
//   price: number;
// }

// // Sanity client setup
// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   useCdn: false,
// });

// const DecorationDetailPage = () => {
//   const [decoration, setDecoration] = useState<Decoration | null>(null);
//   const router = useRouter();
//   const { id } = router.query; // Capture the dynamic `id` from the URL

//   useEffect(() => {
//     if (id) {
//       // Fetch decoration details from Sanity CMS
//       const fetchDecoration = async () => {
//         const query = `*[_type == "decoration" && _id == $id][0]{
//           _id,
//           name,
//           details,
//           price
//         }`;
//         const result = await client.fetch(query, { id });
//         setDecoration(result);
//       };

//       fetchDecoration();
//     }
//   }, [id]);

//   if (!decoration) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-semibold text-gray-800">{decoration.name}</h1>
//         <p className="text-lg text-gray-700 mt-4">{decoration.details}</p>
//         <p className="mt-4 text-xl font-bold text-green-600">${decoration.price}</p>
//       </div>
//     </div>
//   );
// };

// export default DecorationDetailPage;

// app/Home/products/[id]/page.tsx
"use client"
import { createClient } from "@sanity/client";
import { useEffect, useState } from "react";
// Import the useCart hook
import { useParams } from "next/dist/client/components/navigation";
import { Decoration } from "@/app/components/landing";
import { useCart } from "@/app/context/CartContext";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
});

const DecorationDetailPage = () => {
  const [decoration, setDecoration] = useState<Decoration | null>(null);
  const params = useParams(); // Use useParams to access dynamic route parameters
  const id = params?.id; // Get the dynamic 'id' from the URL
  const { addToCart } = useCart(); // Get addToCart function from context

  useEffect(() => {
    if (id) {
      const fetchDecoration = async () => {
        const query = `*[_type == "decoration" && _id == $id][0]{
          _id,
          name,
          details,
          price
        }`;
        const result = await client.fetch(query, { id });
        setDecoration(result);
      };

      fetchDecoration();
    }
  }, [id]);

  if (!decoration) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800">{decoration.name}</h1>
        <p className="text-lg text-gray-700 mt-4">{decoration.details}</p>
        <p className="mt-4 text-xl font-bold text-green-600">${decoration.price}</p>

        {/* Add to Cart Button */}
        <div className="mt-8">
          <button
            onClick={() => {
              addToCart({
                _id: decoration._id,
                name: decoration.name,
                price: decoration.price,
                quantity: 1,
              });
            }}
            className="bg-blue-500 text-white py-3 px-6 rounded-md"
          >
            Add to Cart - ${decoration.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecorationDetailPage;
