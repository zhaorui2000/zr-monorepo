import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
    // 开发环境允许所有源
  }
});
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});
io.on("connection", (socket) => {
  socket.on("disconnect", (...args) => {
    console.log(...args);
  });
  socket.on("agricola", (msg) => {
    io.emit("agricola", msg);
    console.log("message: " + msg);
  });
});
server.listen(2e4, () => {
  console.log("server running at http://localhost:20000");
});
