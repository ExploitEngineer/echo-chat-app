import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "./useAuthStore";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  password?: string;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string | null;
  createdAt: string;
}

interface SendMessagePayload {
  text: string;
  image?: string | null;
}

interface ChatStore {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSendingMessage: boolean;

  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (data: SendMessagePayload) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedUser: (user: User | null) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,

  // Fetch all available users for chat
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get<User[]>("/messages/users");
      set({ users: res.data });
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch messages between logged-in user and selected user
  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get<Message[]>(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message to the selected user
  sendMessage: async ({ text, image }: SendMessagePayload) => {
    const { selectedUser, messages } = get();

    if (!selectedUser) {
      toast.error("Please select a user first");
      return;
    }

    set({ isSendingMessage: true });

    try {
      const res = await axiosInstance.post<Message>(
        `/messages/send/${selectedUser._id}`,
        { text, image },
      );

      // Optimistically update local state
      set({ messages: [...messages, res.data] });

      // Emit real-time event via Socket.IO
      const socket = useAuthStore.getState().socket;
      socket?.emit("sendMessage", res.data);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    } finally {
      set({ isSendingMessage: false });
    }
  },

  // Subscribe to incoming messages via Socket.IO
  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage: Message) => {
      set({ messages: [...get().messages, newMessage] });
    });
  },

  // Unsubscribe from Socket.IO events to prevent memory leaks
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },

  // Set currently active chat user
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
