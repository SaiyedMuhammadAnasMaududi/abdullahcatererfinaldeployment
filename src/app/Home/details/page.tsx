
"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import Link from "next/link";
import Search from "@/app/components/Search";

interface Catering {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  useCdn: false,
});

const CateringPage = () => {
  const [caterings, setCaterings] = useState<Catering[]>([]);
  const [filteredCaterings, setFilteredCaterings] = useState<Catering[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchCaterings = async () => {
      try {
        const query = `*[_type == "catering"]{
          _id,
          name,
          description,
          price
        }`;
        const result = await client.fetch(query);
        setCaterings(result);
        setFilteredCaterings(result);
      } catch (error) {
        console.error("Failed to fetch catering data:", error);
      }
    };

    fetchCaterings();
  }, []);

  const handleSearch = (filteredItems: Catering[]) => {
    setFilteredCaterings(filteredItems);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="w-full px-[5%] md:px-[10%] py-6">
        <p className="text-[32px] font-semibold text-center md:text-left mb-8 text-gray-800">
          Catering Services
        </p>
        <p className="text-center text-lg text-gray-600 mb-12">
          Browse our selection of catering options for your next event.
        </p>
      </div>

      {/* Search Component */}
      <Search
        data={caterings}
        searchKey="name"
        onSearch={(filteredItems) => {
          setFilteredCaterings(filteredItems);
          setSearchQuery(filteredItems.length > 0 ? "" : "No matches found.");
        }}
      />

      {/* Catering Grid or No Results */}
      <div className="px-[5%] md:px-[10%] pb-6">
        {searchQuery ? (
          <p className="text-center text-lg text-gray-500 mt-6">{searchQuery}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCaterings.map((item) => (
              <div
                key={item._id}
                className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <div className="mb-4">
                  <p className="font-semibold text-xl text-gray-800">
                    <Link href={`/Home/details/${item._id}`}>{item.name}</Link>
                  </p>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
                <div className="mt-auto">
                  <p className="text-lg font-bold text-green-600">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CateringPage;
