
// // app/consultants/[id]/page.tsx
// "use client";

// import { createClient } from "@sanity/client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// // Define the Consultant type
// interface Consultant {
//   _id: string;
//   name: string;
//   availability: boolean;
//   specialization: string;
// }

// // Sanity client setup
// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   useCdn: false,
// });

// const ConsultantDetailPage = () => {
//   const [consultant, setConsultant] = useState<Consultant | null>(null);
//   const params = useParams(); // Use useParams to get the dynamic id
//   const id = params?.id; // Access the dynamic segment `id`

//   useEffect(() => {
//     if (id) {
//       // Fetch consultant details from Sanity CMS
//       const fetchConsultant = async () => {
//         const query = `*[_type == "consultancyManager" && _id == $id][0]{
//           _id,
//           name,
//           availability,
//           specialization
//         }`;
//         try {
//           const result = await client.fetch(query, { id });
//           setConsultant(result);
//         } catch (error) {
//           console.error("Error fetching consultant details:", error);
//         }
//       };

//       fetchConsultant();
//     }
//   }, [id]);

//   if (!consultant) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-semibold text-gray-800">{consultant.name}</h1>
//         <p className="text-lg text-gray-700 mt-4">{consultant.specialization}</p>
//         <p className="mt-4 text-xl font-bold text-green-600">
//           {consultant.availability ? "Available" : "Unavailable"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ConsultantDetailPage;





"use client";

import { createClient } from "@sanity/client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Define the Consultant type
interface Consultant {
  _id: string;
  name: string;
  availability: boolean;
  specialization: string;
}

// Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
});

const ConsultantDetailPage = () => {
  const [consultant, setConsultant] = useState<Consultant | null>(null);
  const params = useParams(); // Use useParams to get the dynamic id
  const id = params?.id; // Access the dynamic segment id

  useEffect(() => {
    if (id) {
      // Fetch consultant details from Sanity CMS
      const fetchConsultant = async () => {
        const query = `*[_type == "consultancyManager" && _id == $id][0]{
          _id,
          name,
          availability,
          specialization
        }`;
        try {
          const result = await client.fetch(query, { id });
          setConsultant(result);
        } catch (error) {
          console.error("Error fetching consultant details:", error);
        }
      };

      fetchConsultant();
    }
  }, [id]);

  if (!consultant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800">{consultant.name}</h1>
        <p className="text-lg text-gray-700 mt-4">{consultant.specialization}</p>
        <p className="mt-4 text-xl font-bold text-green-600">
          {consultant.availability ? "Available" : "Unavailable"}
        </p>
      </div>
    </div>
  );
};

export default ConsultantDetailPage;
