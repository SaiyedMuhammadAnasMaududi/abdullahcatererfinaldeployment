"use client";
import { useEffect, useState } from "react";
import { sanityClient } from "@/sanity/lib/sanity";

export default function ReservingDestinationAdmin() {
  const [destinations, setDestinations] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    location: "",
    availability: false,
    details: "",
  });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await sanityClient.fetch(
      `*[_type == "reservingDestination"]{_id, id, name, location, availability, details}`
    );
    setDestinations(data);
  };

  const addItem = async () => {
    if (!newItem.name || !newItem.location) return;
    await sanityClient.create({
      _type: "reservingDestination",
      id: Date.now(),
      name: newItem.name,
      location: newItem.location,
      availability: newItem.availability,
      details: newItem.details,
    });
    setNewItem({ name: "", location: "", availability: false, details: "" });
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
      location: item.location,
      availability: item.availability,
      details: item.details,
    });
  };

  const updateItem = async () => {
    if (!editItem) return;
    await sanityClient
      .patch(editItem._id)
      .set({
        name: newItem.name,
        location: newItem.location,
        availability: newItem.availability,
        details: newItem.details,
      })
      .commit();
    setEditItem(null);
    setNewItem({ name: "", location: "", availability: false, details: "" });
    fetchData();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        🌍 Reserving Destination Management
      </h1>

      {/* Form Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Enter Destination Name"
          value={newItem.name}
          onChange={(e) =>
            setNewItem({ ...newItem, name: e.target.value })
          }
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          placeholder="Location"
          value={newItem.location}
          onChange={(e) =>
            setNewItem({ ...newItem, location: e.target.value })
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
        <textarea
          placeholder="Enter Additional Details"
          value={newItem.details}
          onChange={(e) =>
            setNewItem({ ...newItem, details: e.target.value })
          }
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition col-span-2"
        />
      </div>

      {/* Add / Update Button */}
      <div className="flex justify-center">
        {editItem ? (
          <button
            onClick={updateItem}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition duration-300 shadow-md"
          >
            ✏️ Update Destination
          </button>
        ) : (
          <button
            onClick={addItem}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300 shadow-md"
          >
            ➕ Add Destination
          </button>
        )}
      </div>

      {/* Destinations List */}
      <ul className="mt-6 space-y-4">
        {destinations.map((item) => (
          <li
            key={item._id}
            className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <strong className="text-lg text-gray-900">{item.name}</strong>{" "}
              <span className="text-blue-600 font-semibold text-md">
                - {item.location}
              </span>
              <p className="mt-1 text-gray-600">{item.details}</p>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded-md ${
                  item.availability
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                {item.availability ? "Available" : "Not Available"}
              </span>
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
