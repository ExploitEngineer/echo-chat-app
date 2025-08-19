import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

interface AuthUser {
  _id?: string;
  fullName?: string;
  email: string;
  password?: string;
  profilePic?: string;
  createdAt?: string;
}

interface AuthState {
  authUser: AuthUser | null;
  onlineUsers: string[];
  socket: Socket | null; // Add proper type for socket
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;

  // Actions
  checkAuth: () => Promise<void>;
  signup: (data: AuthUser) => Promise<void>;
  login: (data: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  connectSocket: () => void; // Add type
  disconnectSocket: () => void; // Add type
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  onlineUsers: [],
  socket: null, // Initialize socket as null
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  // Check authentication
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get<AuthUser>("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.error("Error in checkAuth:", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Signup
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post<AuthUser>("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Login
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post<AuthUser>("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  },

  // Update profile
  updateProfile: async (data) => {
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
        console.error("Error in update profile:", err);
        toast.error(err.message);
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Connect to socket.io server
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    newSocket.connect();
    set({ socket: newSocket });

    // Listen for online users
    newSocket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });
  },

  // Disconnect socket safely
  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
