import { Server } from "socket.io";
import { verifySocket } from "../middlewares/socket.middleware.js";

const boardSocketHandler = (server) => {

    const io = new Server(server ,{
        cors: {
            origin: process.env.CORS_ORIGIN,
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    io.of("/board");

    io.use(verifySocket);

    const maxRoomCapacity = 10;
    const rooms = new Map(); // {roomID: [socketID1, socketID2] }
    const roomToHostMap = new Map(); // { roomID: hostID }
    const socketToRoomMap= new Map(); // { socketID: roomID }
    const userIdToSocketMap = new Map(); // { userID: socketID }
    const socketToUserIDMap = new Map(); // { socketID: userID }

  io.on("connection", (socket) => {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
    // Error handling
    socket.on("error", (error) => {
      console.error(`Socket error for user ${username}:`, error);
    });
  });
}

export default boardSocketHandler