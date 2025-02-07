// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";

// // Define types for cart items
// type CartItem = {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };

// interface CartContextType {
//   cartItems: CartItem[];
//   total: number;
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (itemId: string) => void;
//   clearCart: () => void;
// }

// // Default values for the context
// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // Calculate total
//   const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   // Add item to cart
//   const addToCart = (item: CartItem) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i.id === item.id);
//       if (existingItem) {
//         return prevItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prevItems, item];
//     });
//   };

//   // Remove item from cart
//   const removeFromCart = (itemId: string) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//   };

//   // Clear the cart
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


// context/CartContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define types for cart items
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

interface CartContextType {
  cartItems: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

// Default values for the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider component to wrap the app
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Calculate total
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, item];
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
