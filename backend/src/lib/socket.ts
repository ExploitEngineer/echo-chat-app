import http from "http";
import express from "express";
import type { Application } from "express";
import { Server, Socket } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Server as SocketIOServer } from "socket.io";

const app: Application = express();
const server: HTTPServer = http.createServer(app);

const io: SocketIOServer = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

// Used to store online users
const userSocketMap: Record<string, string> = {}; // {userId: socketId}

export function getReceiverSocketId(userId: string): string | undefined {
  return userSocketMap[userId];
}

io.on("connection", (socket: Socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  // Safely handle undefined or array cases
  if (typeof userId === "string") {
    userSocketMap[userId] = socket.id;
  }

  // Send online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    if (typeof userId === "string") {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
