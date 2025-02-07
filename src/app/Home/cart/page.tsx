import React from 'react';
import Cart from '@/app/components/Cart';
import Link from 'next/link';

const CartPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">My Cart</h1>
          <button className="text-blue-600 hover:underline"><Link href="/Home/products">Continue Shopping</Link></button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 flex-grow mt-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4"> Cart Details:</h2>

          {/* Cart Component */}
          <Cart />

          {/* Summary Section */}
          <div className="mt-6 border-t pt-6">
          
            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; {new Date().getFullYear()} Your Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CartPage;

