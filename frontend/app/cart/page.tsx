"use client";

import { useState } from "react";
import Link from "next/link";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } =
    useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);
    try {
      // In a real app, you would redirect to a checkout page or process the payment
      toast.success("Order placed successfully!");
      // Clear the cart after successful checkout
      useCartStore.getState().clearCart();
    } catch (error) {
      toast.error("Failed to process checkout. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Shopping Cart ({totalItems()} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-24 w-24 bg-gray-200 rounded-md overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link
                            href={`/products/${item.id}`}
                            className="hover:text-indigo-600"
                          >
                            {item.name}
                          </Link>
                        </h3>
                        <p className="ml-4 text-lg font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <label
                            htmlFor={`quantity-${item.id}`}
                            className="mr-2 text-sm text-gray-500"
                          >
                            Qty:
                          </label>
                          <select
                            id={`quantity-${item.id}`}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                            className="rounded-md border-gray-300 py-1.5 text-base leading-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            removeItem(item.id);
                            toast.success(`${item.name} removed from cart`);
                          }}
                          className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center"
                        >
                          <FiTrash2 className="mr-1 h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="border-t border-gray-200 py-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalPrice().toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
                <p>Total</p>
                <p>${totalPrice().toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Checkout"}
              </button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link
                  href="/products"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
