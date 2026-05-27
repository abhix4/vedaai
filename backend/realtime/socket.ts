import { Server } from "socket.io";

let io: Server;

export function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(
      "User connected:",
      socket.id
    );

    /*
    |--------------------------------------------------------------------------
    | Join Personal Room
    |--------------------------------------------------------------------------
    */

    socket.on("join", (userId) => {
      socket.join(userId);

      console.log(
        `User joined room ${userId}`
      );
    });

    socket.on("disconnect", () => {
      console.log(
        "User disconnected"
      );
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error(
      "Socket.io not initialized"
    );
  }

  return io;
}