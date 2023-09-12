import express from "express";
import { Server } from "socket.io";
const app = express();
const PORT = 3000;

const options = {
  cors: true,
  origins: ["http://localhost:3000"],
};

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const io = new Server(server, options);

io.on("connection", (socket) => {
  // on connect send the welcome message
  socket.emit("welcome", {
    message: "Welcome to the chat",
    userId: socket.id,
  });
  // join the room
  socket.join("chat");
  // Capture the message from the client
  socket.on("message", (message) => {
    io.to("chat").emit("message", {
      message,
      userId: socket.id,
    });
  });
});
