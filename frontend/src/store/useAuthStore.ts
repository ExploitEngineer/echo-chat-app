import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface AuthUser {
  fullName?: string;
  email: string;
  password: string;
  profilePic?: string;
  createdAt?: string;
}

interface AuthState {
  authUser: AuthUser | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: AuthUser) => Promise<void>;
  login: (data: AuthUser) => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (err) {
      console.log("Error in checkAuth:", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: AuthUser) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: AuthUser) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  },

  updateProfile: async (data: Partial<AuthUser>) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put<AuthUser>(
        "/auth/update-profile",
        data,
      );
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (err) {
      if (err instanceof Error) {
        console.log("error in update profile", err);
        toast.error(err.message);
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
