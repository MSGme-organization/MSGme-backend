import { saveMessage } from "../controller/messageController";
import { Socket } from "socket.io";

const onConnection = (socket: Socket) => {
  socket.on("message-send", async (data) => {
    try {
      const savedMessage = await saveMessage({
        ...data.messageObject,
        roomId: data.roomId,
      });
      if (savedMessage) {
        socket.to(data.roomId).emit("message-receive", savedMessage);
        socket.emit("message-acknowledgment", savedMessage);
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("join-room", (data) => {
    socket.join(data.id);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
};

export default onConnection;
