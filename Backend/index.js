import dotenv from "dotenv";
dotenv.config();    
import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3001",
    credentials: true
}));
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI)
    .then(console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
} catch (error) {
    
}
//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});