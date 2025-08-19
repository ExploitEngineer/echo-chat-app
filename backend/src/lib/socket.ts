import http from "http";
import express from "express";
import { Server } from "socket.io";
import type { Application } from "express";
import type { Server as HTTPServer } from "http";
import type { Server as SocketIOServer } from "socket.io";

const app: Application = express();
const server: HTTPServer = http.createServer(app);

const io: SocketIOServer = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export { io, app, server };
