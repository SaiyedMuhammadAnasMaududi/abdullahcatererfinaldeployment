// src/app/Home/details/[id]/AddToCartButton.tsx
"use client"; // Ensure this is a client component

import { useCart } from "@/app/context/CartContext";

interface CateringItem {
  id: string;
  name: string;
  price: number;
}

const AddToCartButton = ({ catering }: { catering: CateringItem }) => {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() =>
        addToCart({
          id: catering.id,
          name: catering.name,
          price: catering.price,
          quantity: 1,
        })
      }
      className="bg-blue-500 text-white py-3 px-6 rounded-md"
    >
      Add to Cart - ${catering.price}
    </button>
  );
};

export default AddToCartButton;
