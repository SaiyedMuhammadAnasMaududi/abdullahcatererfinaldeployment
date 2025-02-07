// "use client";

// import React, { useState } from "react";

// interface SearchProps<T> {
//   data: T[]; // Array of items to filter
//   searchKey: keyof T; // Key in the object to search by
//   children: (filteredData: T[]) => React.ReactNode; // Function to render filtered data
// }

// function Search<T>({ data, searchKey, children }: SearchProps<T>) {
//   const [query, setQuery] = useState<string>("");

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(event.target.value);
//   };

//   // Ensure data is always an array before filtering
//   const filteredData = Array.isArray(data)
//     ? data.filter((item) =>
//         String(item[searchKey]).toLowerCase().includes(query.toLowerCase())
//       )
//     : [];

//   return (
//     <div className="relative">
//       <input
//         type="text"
//         className="w-full p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-6"
//         placeholder="Search..."
//         value={query}
//         onChange={handleSearch}
//       />
//       {/* Validate that children is a function before calling */}
//       {typeof children === "function" ? (
//         children(filteredData)
//       ) : (
//         <p className="text-red-500">Error: `children` must be a function.</p>
//       )}
//     </div>
//   );
// }

// export default Search;


"use client";

import React, { useState } from "react";

interface SearchProps<T> {
  data: T[];
  searchKey: keyof T;
  onSearch: (filteredData: T[]) => void;
}

function Search<T>({ data, searchKey, onSearch }: SearchProps<T>) {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    const filteredData = Array.isArray(data)
      ? data.filter((item) =>
          String(item[searchKey]).toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];
    onSearch(filteredData);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-6"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
