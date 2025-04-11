import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) => {
        set({ token, user, isAuthenticated: true });
        localStorage.setItem("token", token);
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
        localStorage.removeItem("token");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

// Initialize auth state from localStorage on client side
if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token) as any;
      const user = {
        id: decoded.id,
        name: decoded.name || "",
        email: decoded.email,
        role: decoded.role,
      };
      useAuthStore.getState().setAuth(token, user);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }
}

export default useAuthStore;
