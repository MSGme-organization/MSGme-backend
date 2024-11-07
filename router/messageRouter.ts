import { getMessageByRoom } from "../controller/messageController";
import { Router } from "express";

const messageRouter  = Router();

messageRouter .get("/get-message/:roomId", getMessageByRoom);

export default messageRouter ;
