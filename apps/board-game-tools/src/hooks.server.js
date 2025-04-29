import express from "express";
import { createServer } from "node:http";
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
export const handle = async ({ event, resolve }) => {
  // SvelteKit的默认请求处理
  return resolve(event);
};

// 创建socket.io实例并挂载到全局对象
export const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// 监听连接事件
io.on('connection', (socket) => {
  socket.on('agricola', (msg) => {
    io.emit('agricola', msg);
  });
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

server.listen(20000, () => {
  console.log("server running at http://localhost:20000");
});
