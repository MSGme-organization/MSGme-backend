import {
  addReaction,
  removeReaction,
  saveMessage,
} from "../controller/messageController";
import { Socket, Server } from "socket.io";

const onConnection = (socket: Socket, io: Server) => {
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
  socket.on("message-reaction-add", async (data) => {
    try {
      const response = await addReaction(data.messageId, data.reactionObj);
      if (response) {
        socket
          .to(data.roomId)
          .emit(`reaction-add-${data.messageId}`, response.data.reactions);
        socket.emit(
          `reaction-add-ack-${data.messageId}`,
          response.data.reactions
        );
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("message-reaction-remove", async (data) => {
    try {
      const response = await removeReaction(data.messageId, data.reactionObj);
      if (response) {
        socket.emit(
          `reaction-remove-ack-${data.messageId}`,
          response.data.reactions
        );
        socket
          .to(data.roomId)
          .emit(`reaction-remove-${data.messageId}`, response.data.reactions);
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("reorder-list-request", (roomId) => {
    io.in(roomId).emit("reorder-friends", true);
  });
  socket.on("join-room", (data) => {
    socket.join(data.id);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
};

export default onConnection;
