import { createClient } from "@sanity/client";
import Image from "next/image";
import { notFound } from "next/navigation";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false, // Disable CDN for fresh data
});

const fetchDestinationById = async (id: string) => {
  const query = `*[_type == "reservingDestination" && _id == $id][0]{
    _id,
    name,
    location,
    availability,
    details,
    image
  }`;

  try {
    const result = await client.fetch(query, { id });
    console.log("Fetched Data:", result); // Debugging
    return result;
  } catch (error) {
    console.error("Error fetching destination:", error);
    return null;
  }
};

export default async function DestinationPage({ params }: { params: { id: string } }) {
  const destination = await fetchDestinationById(params.id);

  if (!destination) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 py-16 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">{destination.name}</h1>
          <p className="text-lg mt-4">{destination.location}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-12 p-6 md:p-12 bg-white shadow-md rounded-lg">
        {/* Destination Details */}
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">About This Destination</h2>
        <p className="text-gray-700 mt-4 text-lg leading-relaxed">{destination.details}</p>

        {/* Availability Badge */}
        <div className="mt-8">
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              destination.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {destination.availability ? "Available" : "Not Available"}
          </span>
        </div>

        {/* Image */}
        {destination.image && (
          <div className="mt-8">
            <img
              src={destination.image}
              alt={`${destination.name} image`}
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        )}
      </div>

      {/* Additional Details Section */}
      <div className="max-w-6xl mx-auto mt-12 p-6 md:p-12 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Why Choose This Destination?</h3>
        <ul className="space-y-3 text-gray-700 list-disc list-inside">
          <li>Experience a serene and breathtaking location.</li>
          <li>Availability of modern facilities and amenities.</li>
          <li>Great accessibility and nearby attractions.</li>
          <li>Highly recommended by previous visitors.</li>
        </ul>
      </div>

      {/* Gallery Section */}
      <div className="max-w-6xl mx-auto mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-6 px-6">Explore More Views</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
          <div className="h-40 bg-gray-200 rounded-lg shadow-md"><img src={`/images/image2.png`} alt="Explore more" className="h-auto w-auto rounded-lg " /></div>
          <div className="h-40 bg-gray-200 rounded-lg shadow-md"><img src={`/images/image3.png`} alt="Explore more" className="h-auto w-auto rounded-lg"/></div>
          <div className="h-40 bg-gray-200 rounded-lg shadow-md"><img src={`/images/image3.png`} alt="Explore more" className="h-auto w-auto rounded-lg" /></div>
          <div className="h-40 bg-gray-200 rounded-lg shadow-md"><img src={`/images/image4.png`} alt="Explore more" className="h-auto w-auto rounded-lg"  /></div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-400 py-16 text-white mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold">Interested in Visiting?</h3>
          <p className="mt-2 text-lg">
            Contact us today to make your reservation or learn more about this destination!
          </p>
        <a  href="mailto:tafs4920@gmail.com"><button className="bg-white text-blue-600 px-6 py-3 mt-6 rounded-lg font-medium hover:bg-gray-200">
            Contact Us
          </button></a>
        </div>
      </div>
    </div>
  );
}





// import { useCart } from "@/app/context/CartContext";
// import { createClient } from "@sanity/client";
// import { notFound } from "next/navigation";
//   ; // Import the useCart hook

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   useCdn: false,
// });

// const fetchDestinationById = async (id: string) => {
//   const query = `*[_type == "reservingDestination" && _id == $id][0]{
//     _id,
//     name,
//     location,
//     availability,
//     details,
//     image,
//     price
//   }`;

//   try {
//     const result = await client.fetch(query, { id });
//     return result;
//   } catch (error) {
//     console.error("Error fetching destination:", error);
//     return null;
//   }
// };

// export default async function DestinationPage({ params }: { params: { id: string } }) {
//   const destination = await fetchDestinationById(params.id);
//   if (!destination) {
//     notFound();
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen font-sans">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-green-400 to-blue-500 py-16 text-white shadow-lg">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h1 className="text-4xl md:text-5xl font-extrabold">{destination.name}</h1>
//           <p className="text-lg mt-4">{destination.location}</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto mt-12 p-6 md:p-12 bg-white shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">About This Destination</h2>
//         <p className="text-gray-700 mt-4 text-lg leading-relaxed">{destination.details}</p>

//         {/* Availability Badge */}
//         <div className="mt-8">
//           <span
//             className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
//               destination.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//             }`}
//           >
//             {destination.availability ? "Available" : "Not Available"}
//           </span>
//         </div>

//         {/* Image */}
//         {destination.image && (
//           <div className="mt-8">
//             <img
//               src={destination.image}
//               alt={`${destination.name} image`}
//               className="rounded-lg shadow-md w-full h-auto"
//             />
//           </div>
//         )}

//         {/* Add to Cart Button */}
//         <div className="mt-8">
//           <button
//             onClick={() => {
//               useCart().addToCart({
//                 _id: destination._id,
//                 name: destination.name,
//                 price: destination.price,
//                 quantity: 1,
//               });
//             }}
//             className="bg-blue-500 text-white py-3 px-6 rounded-md"
//           >
//             Add to Cart - ${destination.price}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
