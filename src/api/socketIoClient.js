import io from "socket.io-client";

// Initialize socket connection
const socket = io(import.meta.env.WEBSOCKET_URL, {
  withCredentials: true,
});

export default socket;
