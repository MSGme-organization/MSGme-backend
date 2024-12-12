import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import onConnection from "./socket/connection";
import connectDB from "./db";
import router from "./router/index";

dotenv.config();
connectDB();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/v1", router);
io.on("connection", (socket) => onConnection(socket, io));

httpServer.listen(5000, () => {
  console.log("server run on 5000");
});
