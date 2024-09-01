import io from "socket.io-client";

// Initialize socket connection
const socket = io(import.meta.env.VITE_JITSI_DOMAIN, {
  withCredentials: true,
});

export default socket;
