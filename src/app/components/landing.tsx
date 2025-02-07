"use client"
import React, { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
// Import the Sanity client
import groq from 'groq'; // Import the GROQ query language
import { client } from '@/sanity/lib/client';

// types.ts or any appropriate file
export interface Decoration {
  _id: string;
  name: string;
  details: string;
  price: number;
}

export interface Catering {
  _id: string;
  name: string;
  details: string;
  price: number;
}

const inter = Inter({ subsets: ["latin"] });

const Landing = () => {
  // Define state with types for decoration and catering
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [caterings, setCaterings] = useState<Catering[]>([]);

  // Fetch data from Sanity for decoration and catering
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for decoration from Sanity
        const decorationQuery = groq`*[_type == "decoration"]{_id, name, details, price}`;
        const decorationData: Decoration[] = await client.fetch(decorationQuery);
        setDecorations(decorationData);

        // Fetch data for catering from Sanity
        const cateringQuery = groq`*[_type == "catering"]{_id, name, details, price}`;
        const cateringData: Catering[] = await client.fetch(cateringQuery);
        setCaterings(cateringData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`w-full h-auto flex flex-col space-y-6 ${inter.className} px-4 md:px-[15%]`}>
      {/* Hero Section */}
      <div className="w-full h-auto flex flex-col-reverse md:flex-row items-center bg-gradient-to-r from-[#029fae] to-[#2b8a8d] rounded-bl-[25px] space-y-6 md:space-y-0 md:space-x-10 py-12 px-6 md:px-12">
        {/* Text Section */}
        <div className="flex flex-col space-y-6 w-full md:w-[50%] text-white text-center md:text-left">
          <p className="text-[16px] font-medium">Welcome to Abdullah Event Planners</p>
          <h1 className="text-[28px] md:text-[40px] lg:text-[60px] font-extrabold tracking-tight">
            Best Foods, Event Managements, and Avenues for Your Event!
          </h1>
          <p className="text-[16px] md:text-[18px] font-light mb-6">
            Explore the perfect blend of decorations and catering for your special day. Tailored services for every occasion.
          </p>
          <button className="flex items-center justify-center bg-[#f4a261] text-white font-semibold text-[16px] rounded-md px-6 py-3 hover:bg-[#e76f51] transition duration-300 ease-in-out transform hover:scale-105">
            <span>Get Started</span>
            <FaArrowRightLong className="ml-3" />
          </button>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center w-full md:w-[50%]">
          <Image
            width={434}
            height={584}
            src={`/images/image.png`}
            alt="Catering Setup"
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Decoration Section */}
      <div className="w-full flex flex-col gap-y-6 mt-[10%]">
        <h2 className="text-[32px] font-semibold">Decoration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decorations.slice(0, 3).map((decoration) => (
            <div key={decoration._id} className="p-4 bg-white shadow-lg rounded-lg space-y-4">
              <h3 className="text-[20px] font-semibold">{decoration.name}</h3>
              <p className="text-[14px] text-gray-600">{decoration.details}</p>
              <p className="text-[16px] font-bold text-[#029fae]">${decoration.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Catering Section */}
      <div className="w-full flex flex-col gap-y-6 mt-[10%]">
        <h2 className="text-[32px] font-semibold">Catering</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caterings.slice(0, 3).map((catering) => (
            <div key={catering._id} className="p-4 bg-white shadow-lg rounded-lg space-y-4">
              <h3 className="text-[20px] font-semibold">{catering.name}</h3>
              <p className="text-[14px] text-gray-600">{catering.details}</p>
              <p className="text-[16px] font-bold text-[#029fae]">${catering.price}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Landing;





//original code without bit changes of chatgpt
// import { Inter } from "next/font/google";
// import Image from "next/image";
// import React from "react";
// import { FaArrowRightLong } from "react-icons/fa6";
// const inter = Inter({ subsets: ["latin"] });

// const Landing = () => {
//   return (
//     <div
//       className={w-full h-auto  flex flex-col space-y-4 ${inter.className} px-[15%]}
//     >
//       <div className="w-auto  md:h-[850px] flex flex-col-reverse md:flex md:flex-row md:justify-center md:items-center md:space-x-10 space-y-3 md:space-y-0    bg-[#f0f2f3] border-bl-4  rounded-bl-[25px]">
//         <div className="flex flex-col w-auto h-auto md:w-[557px] md:h-[337px] justify-between space-y-10  pl-3">
//           <p className={'text-[14px] text-[#272343] ${inter.className}}>
//             Welcome to chairy
//           </p>
//           <div
//             className={${inter.className} lg:w-[557px] md:h-[198px] w-auto h-auto flex justify-center items-center}
//           >
//             <p className="text-[60px] text-[#272343] font-bold">
//               Best Furniture Collection for your interior.
//             </p>
//           </div>
//           <div className="w-[171px] h-[52px] flex justify-center items-center bg-[#029fae] space-x-3 rounded-md">
//             <p className="text-[16px] text-[white] font-semibold">Shop Now</p>
//             <FaArrowRightLong className="size-[14px] text-white" />
//           </div>
//         </div>
//         <Image
//           width={434}
//           height={584}
//           src="/images/chair.png"
//           alt="chair"
//           className="pr-4"
//         />
//       </div>
//       <div className="w-full flex space-x-3 flex-col md:flex-row space-y-4 justify-between items-center md:space-y-0">
//         <div>
//           {" "}
//           <Image width={85} height={87} src="/images/logo1.png" alt="logo" />
//         </div>
//         <div>
//           {" "}
//           <Image width={107} height={109} src="/images/logo2.png" alt="logo" />
//         </div>
//         <div>
//           {" "}
//           <Image width={135} height={139} src="/images/logo3.png" alt="logo" />
//         </div>
//         <div>
//           {" "}
//           <Image width={63} height={65} src="/images/logo4.png" alt="logo" />
//         </div>
//         <div>
//           {" "}
//           <Image width={98} height={101} src="/images/logo5.png" alt="logo" />
//         </div>
//         <div>
//           {" "}
//           <Image width={113} height={115} src="/images/logo6.png" alt="logo" />
//         </div>
//         <div>
//           {" "}
//           <Image width={84} height={87} src="/images/logo7.png" alt="logo" />
//         </div>
//       </div>
//       <div className="w-full  h-fit flex flex-col gap-y-6  mt-[10%]">
//         {/* Header Section */}
//         <div className="w-full lg:h-[108px] h-auto flex flex-col xxs:space-y-6 md:space-y-4 static md:relative">
//           <div className="lg:w-[400px] lg:h-[108px] w-auto h-auto md:flex md:flex-row flex flex-col">
//             <div className={w-auto lg:w-[379px] h-[49px] text-[32px] font-semibold ${inter.className}}>
//               Featured Products
//             </div>
//           </div>
//         </div>

//         {/* Product Images Section */}
//         <div className="w-full flex flex-col gap-y-5 items-center md:flex-row md:space-x-3">
//           <div>
//             <Image
//               width={270}
//               height={350}
//               src="/images/product1.png"
//               alt="Today's Product"
//             />
//           </div>
//           <div>
//             <Image
//               width={270}
//               height={350}
//               src="/images/product2.png"
//               alt="Today's Product"
//             />
//           </div>
//           <div>
//             <Image
//               width={270}
//               height={350}
//               src="/images/product3.png"
//               alt="Today's Product"
//             />
//           </div>
//           <div>
//             <Image
//               width={270}
//               height={350}
//               src="/images/product4.png"
//               alt="Today's Product"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="w-full  h-fit flex flex-col gap-y-7  mt-[10%]">
//         {/* Header Section */}
//         <div className="w-full lg:h-[108px] h-auto flex flex-col xxs:space-y-6 md:space-y-4 static md:relative">
//           <div className="lg:w-[400px] lg:h-[108px] w-auto h-auto md:flex md:flex-row flex flex-col">
//           <div className={w-auto lg:w-[379px] h-[49px] text-[32px] font-semibold ${inter.className}}>
//              Top Categories
//             </div>
//           </div>
//         </div>

//         {/* Product Images Section */}
//         <div className="w-full flex flex-col gap-y-5 items-center md:flex-row md:space-x-3">
//           <div>
//             <Image
//               width={424}
//               height={424}
//               src="/images/top1.png"
//               alt="Today's Product"
//             />
//           </div>
//           <div>
//             <Image
//               width={424}
//               height={424}
//               src="/images/top2.png"
//               alt="Today's Product"
//             />
//           </div>
//           <div>
//             <Image
//               width={424}
//               height={424}
//               src="/images/top3.png"
//               alt="Today's Product"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="md:w-full lg:h-[648px]  flex flex-col md:flex md:flex-row gap-x-3">
//         <div className=" w-auto h-auto md:h-[648px] md:w-[50%]">
//           <Image
//             width={648}
//             height={648}
//             src="/images/grid.png"
//             alt="product"
//           />
//         </div>
//         <div className=" w-auto h-auto md:h-[648px] md:w-[50%] grid grid-cols-2 grid-rows-4 gap-x-2 gap-y-2 ">
//           <Image width={312} height={312} src="/images/card.png" alt="cards" />
//           <Image width={312} height={312} src="/images/card2.png" alt="cards" />
//           <Image width={312} height={312} src="/images/card3.png" alt="cards" />
//           <Image width={312} height={312} src="/images/card4.png" alt="cards" />
//         </div>
//       </div>
//       <div className="w-full  h-fit flex flex-col gap-y-6  mt-[0%]">
//         {/* Header Section */}
//         <div className="w-full lg:h-[108px] h-auto flex flex-col xxs:space-y-6 md:space-y-4 static md:relative">
//           <div className="lg:w-[400px] lg:h-[108px] w-auto h-auto md:flex md:flex-row flex flex-col">
//           <div className={w-auto lg:w-[379px] h-[49px] text-[32px] font-semibold ${inter.className}}>
//               Our Products
//             </div>
//           </div>
//         </div>

//         {/* Product Images Section */}
//         <div className="w-full flex flex-col gap-y-5 items-center md:flex-row md:space-x-3">
//           <div>
//             <Image
//               width={270}
//               height={350}
//               src="/images/product1.png"
//               alt="Today's Product"
//             />
//           </div>
//           <div>
//             <Image
//               width={270}
//               height={350}
//               src="/images/product2.png"
//               alt="Today's Product"
//             />
//           </div>
//           <div>
//             <Image
//               width={270}
//               height={350}
//               src="/images/product3.png"
//               alt="Today's Product"
//             />
//           </div>
//           <div>
//             <Image
//               width={270}
//               height={350}
//               src="/images/product4.png"
//               alt="Today's Product"
//             />
//           </div>
//         </div>
//       </div><div className="w-full flex flex-col gap-y-5 md:gap-y-0 items-center md:flex-row md:space-x-3 mb-72">
//           <div>
//             <Image
//               width={270}
//               height={350}
//               src="/images/nchair.png"
//               alt="Today's Product"
//             />
//           </div>
//           <div>
//             <Image
//               width={270}
//               height={350}
//               src="/images/nchair2.png"
//               alt="Today's Product"
//             />
//           </div>
//           <div>
//             <Image
//               width={270}
//               height={350}
//               src="/images/product5.png"
//               alt="Today's Product"
//             />
//           </div>
//           <div>
//             <Image
//               width={270}
//               height={350}
//               src="/images/nchair4.png"
//               alt="Today's Product"
//             />
//           </div>
          
//         </div>
//         <br /><br /><br /><br />
//     </div>
//   );
// };

// export default Landing;