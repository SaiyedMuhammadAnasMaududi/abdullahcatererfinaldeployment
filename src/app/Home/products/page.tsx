


"use client";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import { Roboto } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { createClient } from "@sanity/client";
import Link from "next/link";
import Search from "@/app/components/Search"; // Importing the Search component

interface Decoration {
  _id: string;
  name: string;
  details: string;
  price: number;
}

const openSans = Open_Sans({
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  useCdn: false,
});

const Page = () => {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [filteredDecorations, setFilteredDecorations] = useState<Decoration[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchDecorations = async () => {
      try {
        const query = `*[_type == "decoration"]{
          _id,
          name,
          details,
          price
        }`;
        const result = await client.fetch(query);
        setDecorations(result);
        setFilteredDecorations(result);
      } catch (error) {
        console.error("Failed to fetch decoration data:", error);
      }
    };

    fetchDecorations();
  }, []);

  const handleSearch = (filteredItems: Decoration[]) => {
    setFilteredDecorations(filteredItems);
    setSearchQuery(filteredItems.length > 0 ? "" : "No matches found.");
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className={`w-full px-[5%] md:px-[10%] py-6 ${inter.className}`}>
        <p className="text-[32px] font-semibold text-center md:text-left mb-8 text-gray-800">
          Decorations for Every Occasion
        </p>
        <p className="text-center text-lg text-gray-600 mb-12">
          Browse through our exquisite collection of decorations, perfect for making your event truly memorable.
        </p>
      </div>

      {/* Search Component */}
      <Search
        data={decorations}
        searchKey="name"
        onSearch={(filteredItems) => handleSearch(filteredItems)}
      />

      {/* Decorations Grid or No Results */}
      <div className="px-[5%] md:px-[10%] pb-6">
        {searchQuery ? (
          <p className="text-center text-lg text-gray-500 mt-6">{searchQuery}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDecorations.map((item) => (
              <div
                key={item._id}
                className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <div className="mb-4">
                  <p className="font-semibold text-xl text-gray-800">
                    <Link href={`/Home/products/${item._id}`}>{item.name}</Link>
                  </p>
                  <p className="text-gray-500 text-sm">{item.details}</p>
                </div>
                <div className="mt-auto">
                  <p className="text-lg font-bold text-green-600">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className={`w-full px-[5%] py-8 bg-[#f4f4f5] ${roboto.className} text-center`}>
        <p className={`text-[50px] font-medium ${roboto.className} text-gray-800`}>
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
        <p className="mt-8 text-gray-600">Follow us on Instagram for more inspiration and discounts!</p>
      </div>
    </div>
  );
};

export default Page;
