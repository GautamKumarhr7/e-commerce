"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { getProduct } from "../../utils/api";
import useCartStore from "../../store/cartStore";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  categoryId: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(Number(id));
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
        router.push("/products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });

    toast.success(`${quantity} ${product.name} added to cart`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Image */}
        <div className="lg:max-w-lg lg:w-full">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6 text-base text-gray-700">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-8 flex">
            <div className="flex items-center border border-gray-300 rounded-md">
              <label htmlFor="quantity" className="sr-only">
                Quantity
              </label>
              <select
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              onClick={handleAddToCart}
              className="ml-8 flex-1 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <FiShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </button>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
            <div className="mt-4">
              <ul className="list-disc pl-4 space-y-2 text-sm text-gray-700">
                <li>Premium quality product</li>
                <li>Fast shipping available</li>
                <li>30-day money-back guarantee</li>
                <li>24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
