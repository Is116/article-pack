const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (message) => {
      console.log("Received message: " + message);
      io.emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
