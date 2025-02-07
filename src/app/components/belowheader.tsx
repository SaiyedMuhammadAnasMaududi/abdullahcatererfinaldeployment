import { Inter } from "next/font/google";
import React from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Belowheader = () => {
  return (
    <div
      className={`w-full md:h-[74px] h-auto flex flex-wrap-reverse bg-white text-topheadertext justify-between py-2 md:py-0 md:items-center ${inter.className} mt-[74px]`}
    >
      {/* Navigation Links Section */}
      <div className="w-full md:w-[60%] flex flex-wrap justify-between items-center text-topheadertext py-2 sm:py-0 mx-[5%]">
        <Link href="/Home" aria-label="Go to home page">
          <p className="text-[14px] font-medium text-[#298b94]">Home</p>
        </Link>
        <Link href="/Home/details" aria-label="Go to shop page">
          <p className="text-[14px] font-medium">Catering</p>
        </Link>
        <Link href="/Home/products" aria-label="Go to product page">
          <p className="text-[14px] font-medium">Decoration</p>
        </Link>
        <Link href="/Home/questions" aria-label="Go to pages page">
          <p className="text-[14px] font-medium">Consultancy</p>
        </Link>
        <Link href="/Home/about" aria-label="Go to about page">
          <p className="text-[14px] font-medium">Reservations</p>
        </Link>
        <p><Link href="/admin/login" className="bg-blue-500 px-3 py-1 rounded">Admin</Link></p>
      </div>

      {/* Contact Information Section */}
      <div className="sm:w-[168px] sm:h-[15px] w-auto h-auto flex justify-between items-center space-x-2 sm:space-x-0 py-2 sm:py-0 mx-[5%]">
        <Link href="tel:+923212859972" aria-label="Go to contact page">
          <p className="text-[14px] text-topheadertext">Call Us</p>
        
        <p className="text-[14px] text-black font-medium">{`+92 3212859972`}</p>
        </Link> </div>
    </div>
  );
};

export default Belowheader;
