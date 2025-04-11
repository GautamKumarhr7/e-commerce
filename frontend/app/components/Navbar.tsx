"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import useAuthStore from "../store/authStore";
import useCartStore from "../store/cartStore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { totalItems } = useCartStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">E-Shop</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Categories
            </Link>
            <Link
              href="/cart"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium relative"
            >
              <FiShoppingCart className="h-5 w-5" />
              {totalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {totalItems()}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                  <FiUser className="h-5 w-5 mr-1" />
                  {user?.name || "Account"}
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-10 hidden group-hover:block">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Categories
            </Link>
            <Link
              href="/cart"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Cart ({totalItems()})
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  Profile
                </Link>
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="block w-full text-left text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
