import {
  getMessageByRoom,
  messageDelete,
  messageEdit,
} from "../controller/messageController";
import { Router } from "express";

const messageRouter = Router();

messageRouter.get("/get-message/:roomId", getMessageByRoom);
messageRouter.delete("/delete-message/:messageId", messageDelete);
messageRouter.put("/edit-message/:messageId", messageEdit);

export default messageRouter;
