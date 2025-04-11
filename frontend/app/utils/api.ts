import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const login = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const signup = async (
  name: string,
  email: string,
  password: string,
  role: string = "user"
) => {
  const response = await api.post("/signup", { name, email, password, role });
  return response.data;
};

// Product API calls
export const getProduct = async (id: number) => {
  const response = await api.get(`/api/getProduct/${id.toString()}`);
  return response.data;
};

export const addProducts = async (productData: any) => {
  const response = await api.post("/addProducts", productData);
  return response.data;
};

// Category API calls
export const getCategories = async (id?: string) => {
  const url = id ? `/api/getCategories/${id}` : "/getCategories";
  const response = await api.get(url);
  return response.data;
};

export const addCategories = async (categoryData: any) => {
  const response = await api.post("/addCategories", categoryData);
  return response.data;
};

// Cart API calls
export const getCartItems = async () => {
  const response = await api.get("/getCartItems");
  return response.data;
};

export const addToCart = async (cartData: any) => {
  const response = await api.post("/addToCart", cartData);
  return response.data;
};

export default api;
