"use client";
import { useEffect, useState } from "react";
import { sanityClient } from "@/sanity/lib/sanity";

export default function ConsultancyManagerAdmin() {
  const [consultants, setConsultants] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    availability: false,
    specialization: "",
  });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await sanityClient.fetch(
      `*[_type == "consultancyManager"]{_id, id, name, availability, specialization}`
    );
    setConsultants(data);
  };

  const addItem = async () => {
    if (!newItem.name || !newItem.specialization) return;
    await sanityClient.create({
      _type: "consultancyManager",
      id: Date.now(),
      name: newItem.name,
      availability: newItem.availability,
      specialization: newItem.specialization,
    });
    setNewItem({ name: "", availability: false, specialization: "" });
    fetchData();
  };

  const deleteItem = async (id) => {
    await sanityClient.delete(id);
    fetchData();
  };

  const startEdit = (item) => {
    setEditItem(item);
    setNewItem({
      name: item.name,
      availability: item.availability,
      specialization: item.specialization,
    });
  };

  const updateItem = async () => {
    if (!editItem) return;
    await sanityClient
      .patch(editItem._id)
      .set({
        name: newItem.name,
        availability: newItem.availability,
        specialization: newItem.specialization,
      })
      .commit();
    setEditItem(null);
    setNewItem({ name: "", availability: false, specialization: "" });
    fetchData();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        🏢 Consultancy Manager
      </h1>

      {/* Form Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Enter Name"
          value={newItem.name}
          onChange={(e) =>
            setNewItem({ ...newItem, name: e.target.value })
          }
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          placeholder="Specialization"
          value={newItem.specialization}
          onChange={(e) =>
            setNewItem({ ...newItem, specialization: e.target.value })
          }
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <select
          value={newItem.availability}
          onChange={(e) =>
            setNewItem({ ...newItem, availability: e.target.value === "true" })
          }
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>

      {/* Add / Update Button */}
      <div className="flex justify-center">
        {editItem ? (
          <button
            onClick={updateItem}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition duration-300 shadow-md"
          >
            ✏️ Update Consultant
          </button>
        ) : (
          <button
            onClick={addItem}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300 shadow-md"
          >
            ➕ Add Consultant
          </button>
        )}
      </div>

      {/* Consultants List */}
      <ul className="mt-6 space-y-4">
        {consultants.map((item) => (
          <li
            key={item._id}
            className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <strong className="text-lg text-gray-900">{item.name}</strong>{" "}
              <span className="text-blue-600 font-semibold text-md">
                - {item.specialization}
              </span>
              <p
                className={`mt-1 text-sm ${
                  item.availability ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.availability ? "✅ Available" : "❌ Not Available"}
              </p>
            </div>
            <div className="flex gap-2 mt-3 md:mt-0">
              <button
                onClick={() => startEdit(item)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition duration-300 shadow-md"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-300 shadow-md"
              >
                ❌ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
