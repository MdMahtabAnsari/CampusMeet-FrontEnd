import io from "socket.io-client";

// Initialize socket connection
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
});

export default socket;
