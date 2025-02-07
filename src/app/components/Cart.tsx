"use client";

import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, total, removeFromCart } = useCart();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-lg text-gray-700">Total items: <span className="font-semibold">{cartItems.length}</span></p>
            <p className="text-lg text-gray-700">Total amount: <span className="font-semibold">${total.toFixed(2)}</span></p>
          </div>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <li
                key={`${item.id}-${index}`} // Ensures uniqueness even if `item.id` repeats
                className="flex justify-between items-center py-4"
              >
                <div>
                  <p className="text-gray-800 font-medium">{item.name}</p>
                  <p className="text-gray-600">${item.price} x {item.quantity}</p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 font-medium"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Cart;
