"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart, FiFilter } from "react-icons/fi";
import { getProduct, getCategories } from "../utils/api";
import useCartStore from "../store/cartStore";
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would have an API endpoint for all products
        // For now, we'll just fetch a few products
        const productPromises = [1, 2, 3, 4, 5, 6].map((id) => getProduct(id));
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

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.categoryId === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">All Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FiFilter className="mr-2 h-5 w-5" />
              Filters
            </h2>

            <div className="mb-4">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                value={selectedCategory || ""}
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                No products found
              </h2>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
                        <span className="text-gray-400">
                          No image available
                        </span>
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
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
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
          )}
        </div>
      </div>
    </div>
  );
}
