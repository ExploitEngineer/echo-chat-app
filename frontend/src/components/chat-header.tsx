import { X } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) {
    return (
      <div className="border-base-300 border-b p-3 text-center text-zinc-500">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="border-base-300 border-b p-2.5">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="relative size-10 rounded-full">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="rounded-full object-cover"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-base-content/70 text-sm">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
}
