// // app/Home/consultancy/page.tsx
// "use client";

// import { Inter } from 'next/font/google';
// import React, { useEffect, useState } from 'react';
// import { Roboto } from 'next/font/google';
// import { Open_Sans } from 'next/font/google';
// import { createClient } from '@sanity/client';
// import { FaUser, FaChalkboardTeacher, FaMedal } from 'react-icons/fa';
// import Link from 'next/link';
// import Search from '../../components/Search'; // Import Search component

// // Define the Consultant type based on the schema
// interface Consultant {
//   _id: string;
//   name: string;
//   availability: boolean;
//   specialization: string;
// }

// const openSans = Open_Sans({
//   subsets: ['latin'],
// });

// const roboto = Roboto({
//   weight: '400',
//   subsets: ['latin'],
// });

// const inter = Inter({ subsets: ["latin"] });

// // Sanity client setup
// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   useCdn: false,
// });

// const Page = () => {
//   const [consultants, setConsultants] = useState<Consultant[]>([]);

//   useEffect(() => {
//     const fetchConsultants = async () => {
//       const query = `*[_type == "consultancyManager"]{
//         _id,
//         name,
//         availability,
//         specialization
//       }`;
//       const result = await client.fetch(query);

//       const uniqueConsultants = result
//         .filter((item: Consultant) => item.specialization && item.specialization.trim() !== '')
//         .reduce((acc: Consultant[], item: Consultant) => {
//           if (!acc.some(consultant => consultant.name === item.name)) {
//             acc.push(item);
//           }
//           return acc;
//         }, []); 

//       setConsultants(uniqueConsultants);
//     };

//     fetchConsultants();
//   }, []);

//   return (
//     <div className="bg-gray-50 min-h-screen font-sans">
//       {/* Header Section */}
//       <div className={`w-full px-[5%] md:px-[10%] py-6 ${inter.className}`}>
//         <p className='text-[32px] font-semibold text-center md:text-left mb-8'>
//           Meet Our Expert Consultants
//         </p>
//         <p className='text-center text-lg text-gray-600'>
//           Discover the top experts who are here to guide you through every step of the process.
//         </p>
//       </div>

//       {/* Search Section */}
//       <Search data={consultants} searchKey="name">
//         {(filteredConsultants: any[]) => (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-[5%] md:px-[10%] pb-6">
//             {filteredConsultants.map((item) => (
//               <div key={item._id} className="flex flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
//                 <div className="mb-4 text-center">
//                   <div className="text-4xl text-green-600">
//                     {item.specialization === 'Leadership' && <FaUser />}
//                     {item.specialization === 'Business Strategy' && <FaChalkboardTeacher />}
//                     {item.specialization === 'Expert Consultant' && <FaMedal />}
//                   </div>
//                   <p className="font-semibold text-xl text-gray-800 mt-4">{item.name}</p>
//                   <p className="text-gray-500 text-sm">{item.specialization}</p>
//                 </div>
//                 <div className="mt-auto">
//                   <p className="text-lg font-bold text-green-600">
//                     {item.availability ? 'Available' : 'Not Available'}
//                   </p>
//                 </div>
//                 <Link href={`/Home/questions/${item._id}`} className="mt-4 text-blue-500 hover:underline">
//                   View Details
//                 </Link>
//               </div>
//             ))}
//           </div>
//         )}
//       </Search>

//       {/* Footer Section */}
//       <div className={`w-full px-[5%] py-8 bg-[#f4f4f5] ${roboto.className} text-center`}>
//         <p className={`text-[50px] font-medium ${roboto.className} text-gray-800`}>Subscribe for Updates!</p>
//         <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-3 mt-6">
//           <input
//             type="email"
//             placeholder="Enter your email..."
//             className="md:w-[500px] w-[300px] p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-all">
//             Subscribe
//           </button>
//         </div>
//         <p className="mt-8 text-gray-600">Follow us on Instagram for more inspiration and discounts!</p>
//       </div>
//     </div>
//   );
// };

// export default Page;


// "use client";

// import { Inter } from "next/font/google";
// import React, { useEffect, useState } from "react";
// import { Roboto } from "next/font/google";
// import { Open_Sans } from "next/font/google";
// import { createClient } from "@sanity/client";
// import { FaUser, FaChalkboardTeacher, FaMedal } from "react-icons/fa";
// import Link from "next/link";
// import Search from "../../components/Search"; // Import Search component

// // Define the Consultant type
// interface Consultant {
//   _id: string;
//   name: string;
//   availability: boolean;
//   specialization: string;
// }

// const openSans = Open_Sans({
//   subsets: ["latin"],
// });

// const roboto = Roboto({
//   weight: "400",
//   subsets: ["latin"],
// });

// const inter = Inter({ subsets: ["latin"] });

// // Sanity client setup
// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   useCdn: false,
// });

// const Page = () => {
//   const [consultants, setConsultants] = useState<Consultant[]>([]);
//   const [filteredConsultants, setFilteredConsultants] = useState<Consultant[]>(
//     []
//   );
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchConsultants = async () => {
//       try {
//         const query = `*[_type == "consultancyManager"]{
//           _id,
//           name,
//           availability,
//           specialization
//         }`;
//         const result = await client.fetch(query);

//         const uniqueConsultants = result
//           .filter(
//             (item: Consultant) =>
//               item.specialization && item.specialization.trim() !== ""
//           )
//           .reduce((acc: Consultant[], item: Consultant) => {
//             if (!acc.some((consultant) => consultant.name === item.name)) {
//               acc.push(item);
//             }
//             return acc;
//           }, []);

//         setConsultants(uniqueConsultants);
//         setFilteredConsultants(uniqueConsultants); // Initialize filtered consultants
//       } catch (err) {
//         setError("Failed to fetch consultants. Please try again later.");
//       }
//     };

//     fetchConsultants();
//   }, []);

//   // Handler for the Search component
//   const handleSearch = (filteredData: Consultant[]) => {
//     setFilteredConsultants(filteredData);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen font-sans">
//       {/* Header Section */}
//       <div className={`w-full px-[5%] md:px-[10%] py-6 ${inter.className}`}>
//         <p className="text-[32px] font-semibold text-center md:text-left mb-8">
//           Meet Our Expert Consultants
//         </p>
//         <p className="text-center text-lg text-gray-600">
//           Discover the top experts who are here to guide you through every step
//           of the process.
//         </p>
//       </div>

//       {/* Error Section */}
//       {error && (
//         <div className="text-center text-red-600 bg-red-100 py-2 mb-4">
//           {error}
//         </div>
//       )}

//       {/* Search Section */}
//       <Search data={consultants} searchKey="name" onSearch={handleSearch} />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-[5%] md:px-[10%] pb-6">
//         {filteredConsultants.length > 0 ? (
//           filteredConsultants.map((item) => (
//             <div
//               key={item._id}
//               className="flex flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
//             >
//               <div className="mb-4 text-center">
//                 <div className="text-4xl text-green-600">
//                   {item.specialization === "Leadership" && <FaUser />}
//                   {item.specialization === "Business Strategy" && (
//                     <FaChalkboardTeacher />
//                   )}
//                   {item.specialization === "Expert Consultant" && <FaMedal />}
//                 </div>
//                 <p className="font-semibold text-xl text-gray-800 mt-4">
//                   {item.name}
//                 </p>
//                 <p className="text-gray-500 text-sm">{item.specialization}</p>
//               </div>
//               <div className="mt-auto">
//                 <p className="text-lg font-bold text-green-600">
//                   {item.availability ? "Available" : "Not Available"}
//                 </p>
//               </div>
//               <Link
//                 href={`/Home/questions/${item._id}`}
//                 className="mt-4 text-blue-500 hover:underline"
//               >
//                 View Details
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-600 col-span-full">
//             No consultants match your search.
//           </p>
//         )}
//       </div>

//       {/* Footer Section */}
//       <div
//         className={`w-full px-[5%] py-8 bg-[#f4f4f5] ${roboto.className} text-center`}
//       >
//         <p
//           className={`text-[50px] font-medium ${roboto.className} text-gray-800`}
//         >
//           Subscribe for Updates!
//         </p>
//         <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-3 mt-6">
//           <input
//             type="email"
//             placeholder="Enter your email..."
//             className="md:w-[500px] w-[300px] p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-all">
//             Subscribe
//           </button>
//         </div>
//         <p className="mt-8 text-gray-600">
//           Follow us on Instagram for more inspiration and discounts!
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Page;



"use client";

import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import { Roboto } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { createClient } from "@sanity/client";
import { FaUser, FaChalkboardTeacher, FaMedal } from "react-icons/fa";
import Link from "next/link";
import Search from "../../components/Search"; // Import Search component

// Define the Consultant type
interface Consultant {
  _id: string;
  name: string;
  availability: boolean;
  specialization: string;
}

const openSans = Open_Sans({
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

// Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
});

const Page = () => {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [filteredConsultants, setFilteredConsultants] = useState<Consultant[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const query = `*[_type == "consultancyManager"]{
          _id,
          name,
          availability,
          specialization
        }`;
        const result = await client.fetch(query);

        const uniqueConsultants = result
          .filter(
            (item: Consultant) =>
              item.specialization && item.specialization.trim() !== ""
          )
          .reduce((acc: Consultant[], item: Consultant) => {
            if (!acc.some((consultant) => consultant.name === item.name)) {
              acc.push(item);
            }
            return acc;
          }, []);

        setConsultants(uniqueConsultants);
        setFilteredConsultants(uniqueConsultants); // Initialize filtered consultants
      } catch (err) {
        setError("Failed to fetch consultants. Please try again later.");
      }
    };

    fetchConsultants();
  }, []);

  // Handler for the Search component
  const handleSearch = (filteredData: Consultant[]) => {
    setFilteredConsultants(filteredData);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <header className={`w-full px-[5%] md:px-[10%] py-6 ${inter.className}`}>
        <p className="text-[32px] font-semibold text-center md:text-left mb-8">
          Meet Our Expert Consultants
        </p>
        <p className="text-center text-lg text-gray-600">
          Discover the top experts who are here to guide you through every step
          of the process.
        </p>
      </header>

      {/* Error Section */}
      {error && (
        <div className="text-center text-red-600 bg-red-100 py-2 mb-4">
          {error}
        </div>
      )}

      {/* Search Section */}
      <Search data={consultants} searchKey="name" onSearch={handleSearch} />
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-[5%] md:px-[10%] pb-6">
        {filteredConsultants.length > 0 ? (
          filteredConsultants.map((item) => (
            <div
              key={item._id}
              className="flex flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="mb-4 text-center">
                <div className="text-4xl text-green-600">
                  {item.specialization === "Leadership" && <FaUser />}
                  {item.specialization === "Business Strategy" && (
                    <FaChalkboardTeacher />
                  )}
                  {item.specialization === "Expert Consultant" && <FaMedal />}
                </div>
                <p className="font-semibold text-xl text-gray-800 mt-4">
                  {item.name}
                </p>
                <p className="text-gray-500 text-sm">{item.specialization}</p>
              </div>
              <div className="mt-auto">
                <p className="text-lg font-bold text-green-600">
                  {item.availability ? "Available" : "Not Available"}
                </p>
              </div>
              <Link
                href={`/Home/questions/${item._id}`}
                className="mt-4 text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No consultants match your search.
          </p>
        )}
      </main>

      {/* Footer Section */}
      <footer
        className={`w-full px-[5%] py-8 bg-[#f4f4f5] ${roboto.className} text-center`}
      >
        <p
          className={`text-[50px] font-medium ${roboto.className} text-gray-800`}
        >
          Subscribe for Updates!
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-3 mt-6">
          <input
            type="email"
            placeholder="Enter your email..."
            className="md:w-[500px] w-[300px] p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-all">
            Subscribe
          </button>
        </div>
        <p className="mt-8 text-gray-600">
          Follow us on Instagram for more inspiration and discounts!
        </p>
      </footer>
    </div>
  );
};

export default Page;