import { Request, Response } from "express";
import messageModel, { Reaction } from "../model/message";

export type MessageData = {
  username: string;
  userId: string;
  roomId: string;
  avatar?: string;
  message: string;
  repliedMsgId?: string;
  reactions?: Reaction[];
};

export const saveMessage = async (messageData: MessageData) => {
  try {
    const message = new messageModel(messageData);
    const savedData = await message.save();
    
    const savedMessage = await savedData.populate({
      path: "repliedMsg",
      model: "Message",
      select: "username fullName avatar message iv reactions createdAt",
    });
    
    return savedMessage;
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

export const getMessageByRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  try {
    const messages = await messageModel
      .find({ roomId })
      .populate({
        path: "repliedMsg",
        select: "username fullName avatar message iv reactions createdAt",
      })
      .exec();

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
};

