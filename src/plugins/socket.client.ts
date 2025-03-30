import { io, Socket } from "socket.io-client";

export default defineNuxtPlugin(() => {
  console.log("ℹ️ Initializing WebSocket...");

  const socket: Socket = io("http://127.0.0.1:5000", {
    withCredentials: true,
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("✅ WebSocket plugin connected!", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("⚠️ WebSocket Plugin Error:", err.message);
  });

  socket.on("disconnect", () => {
    console.warn("❌ WebSocket disconnected!");
  });

  return {
    provide: {
      socket,
    },
  };
});
