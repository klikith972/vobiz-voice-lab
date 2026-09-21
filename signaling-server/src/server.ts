import { WebSocketServer, WebSocket } from "ws";

const PORT = 8080;

const wss = new WebSocketServer({
  port: PORT,
});

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log("Received:", message.toString());

    // Send the message to every other connected client
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log(`Signaling server running on ws://localhost:${PORT}`);