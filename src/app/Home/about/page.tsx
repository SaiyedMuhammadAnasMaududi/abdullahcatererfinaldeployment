// "use client";
// import React, { useEffect, useState } from "react";
// import { createClient } from "@sanity/client";
// import Link from "next/link"; // Import Link
// import Search from "@/app/components/Search";

// interface Reservation {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
// }

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   useCdn: false,
// });

// const ReservationPage = () => {
//   const [reservations, setReservations] = useState<Reservation[]>([]);
//   const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);

//   useEffect(() => {
//     const fetchReservations = async () => {
//       const query = `*[_type == "reservingDestination"]{
//         _id,
//         name,
//         description,
//         price
//       }`;
//       const result = await client.fetch(query);
//       setReservations(result);
//       setFilteredReservations(result);
//     };

//     fetchReservations();
//   }, []);

//   return (
//     <div className="bg-gray-50 min-h-screen font-sans">
//       <div className="w-full px-[5%] md:px-[10%] py-6">
//         <p className="text-[32px] font-semibold text-center md:text-left mb-8 text-gray-800">
//           Reservation Services
//         </p>
//         <p className="text-center text-lg text-gray-600 mb-12">
//           Explore our reservation services for your events and needs.
//         </p>
//       </div>

//       {/* Search Component */}
//       <Search data={reservations} searchKey="name">
//         {(filteredItems) => {
//           setFilteredReservations(filteredItems);
//           return null;  // No UI to render here, just update state
//         }}
//       </Search>

//       {/* Reservation Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-[5%] md:px-[10%] pb-6">
//         {filteredReservations.map((item) => (
//           <div
//             key={item._id}
//             className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all"
//           >
//             <div className="mb-4">
//               <p className="font-semibold text-xl text-gray-800">
//                 <Link href={`/Home/about/${item._id}`}>{item.name}</Link>
//               </p>
//               <p className="text-gray-500 text-sm">{item.description}</p>
//             </div>
//             <div className="mt-auto">
//               <p className="text-lg font-bold text-green-600">${item.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReservationPage;

"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import Link from "next/link";
import Search from "@/app/components/Search";

interface Reservation {
  _id: string;
  name: string;
  location: string;
  availability: boolean;
  details: string;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  useCdn: false,
});

const ReservationPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const query = `*[_type == "reservingDestination"]{
        _id,
        name,
        location,
        availability,
        details
      }`;
      const result = await client.fetch(query);
      setReservations(result);
      setFilteredReservations(result);
    };

    fetchReservations();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="w-full px-[5%] md:px-[10%] py-6">
        <p className="text-[32px] font-semibold text-center md:text-left mb-8 text-gray-800">
          Reservation Services
        </p>
        <p className="text-center text-lg text-gray-600 mb-12">
          Explore our reservation services for your events and needs.
        </p>
      </div>

      {/* Search Component */}
      <Search
        data={reservations}
        searchKey="name"
        onSearch={(filteredItems) => setFilteredReservations(filteredItems)}
      />

      {/* Reservation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-[5%] md:px-[10%] pb-6">
        {filteredReservations.map((item) => (
          <div
            key={item._id}
            className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all"
          >
            <div className="mb-4">
              <p className="font-semibold text-xl text-gray-800">
                <Link href={`/Home/about/${item._id}`}>{item.name}</Link>
              </p>
              <p className="text-gray-500 text-sm">{item.details}</p>
              <p className="text-gray-500 text-sm">Location: {item.location}</p>
            </div>
            <div className="mt-auto">
              <p className="text-lg font-bold text-green-600">
                {item.availability ? "Available" : "Unavailable"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationPage;
