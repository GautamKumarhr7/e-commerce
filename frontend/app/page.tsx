"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { getProduct, getCategories } from "./utils/api";
import useCartStore from "./store/cartStore";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would have an API endpoint for featured products
        // For now, we'll just fetch a few products
        const productPromises = [1, 2, 3].map((id) => getProduct(id));
        const productsData = await Promise.all(productPromises);
        setProducts(productsData);

        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="py-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to <span className="text-indigo-600">E-Shop</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Discover amazing products at great prices. Shop the latest trends and
          find everything you need.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              href="/products"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Shop Now
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link
              href="/categories"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group relative rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Browse all {category.name} products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  <Link href={`/products/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <FiShoppingCart className="mr-1 h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
