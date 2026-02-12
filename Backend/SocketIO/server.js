import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
    "http://localhost:3001",
    "https://chat-app-eight-beta-42.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
});

// online users map
const users = {};

// helper
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (!userId || userId === "undefined") {
    console.log("❌ Socket connected without valid userId:", socket.id);
    return;
  }

  users[userId] = socket.id;
  console.log("Online Users:", users);

  io.emit("getOnlineUsers", Object.keys(users));

  // 🔹 TYPING START
  socket.on("typing", ({ to }) => {
    const receiverSocketId = users[to];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userTyping", { from: userId });
    }
  });

  // 🔹 TYPING STOP
  socket.on("stopTyping", ({ to }) => {
    const receiverSocketId = users[to];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userStopTyping", { from: userId });
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnect", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
