import { Inter } from "next/font/google";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";

const inter = Inter({ subsets: ["latin"] });

const Header = () => {
  return (
    <div className="w-full bg-[#f0f2f3] text-[#272343] shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-16">
        {/* Logo Section */}
        <div className={`${inter.className} flex items-center space-x-2`}>
          <Image
            src={`/images/image1.png`}
            width={40}
            height={40}
            alt="logo"
          />
          <p className="text-xl sm:text-2xl font-semibold">Abdullah Event Planners</p>
        </div>

        {/* Navigation and Cart Section */}
        <div className="flex items-center space-x-6">
          <Link href="/Home" passHref>
            <p className="text-sm sm:text-base font-medium text-[#272343] hover:text-[#029fae] transition duration-200">Home</p>
          </Link>
          <Link href="/Home/details" passHref>
            <p className="text-sm sm:text-base font-medium text-[#272343] hover:text-[#029fae] transition duration-200">Food Info</p>
          </Link>

          {/* Cart Section */}
          <div className="relative flex items-center space-x-2 bg-white text-black py-2 px-4 rounded-md shadow-lg cursor-pointer">
            <Link href="/Home/cart">
              <CiShoppingCart className="text-2xl" />
            </Link>
            <p className="text-xs sm:text-sm font-medium">Cart</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
