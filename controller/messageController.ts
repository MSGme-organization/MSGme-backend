import { Request, Response } from "express";
import messageModel from "../model/message";
import {
  MessageDataType,
  messageValidate,
  ReactionType,
  reactionValidate,
} from "../helper/zodValidation";

export const saveMessage = async (messageData: MessageDataType) => {
  const validation = messageValidate.safeParse(messageData);

  if (!validation.success) {
    const errorDetails = validation.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    throw new Error(JSON.stringify(errorDetails));
  }

  try {
    const message = new messageModel(validation.data);
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

export const addReaction = async (
  messageId: string,
  reactionObj: ReactionType
) => {
  const validation = reactionValidate.safeParse(reactionObj);

  if (!validation.success) {
    const errorDetails = validation.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    throw new Error(JSON.stringify(errorDetails));
  }

  try {
    const message = await messageModel.findById(messageId);
    if (!message) {
      throw new Error("Message not found");
    }

    const existingReactionIndex = message.reactions.findIndex(
      (reaction) => reaction.userId === validation.data.userId
    );

    if (existingReactionIndex !== -1) {
      message.reactions[existingReactionIndex].emoji = validation.data.emoji;
      message.reactions[existingReactionIndex].timestamp = new Date();
    } else {
      const newReaction = {
        ...validation.data,
        timestamp: new Date(),
      };
      message.reactions.push(newReaction);
    }

    await message.save();

    return {
      message: "Reaction added or updated successfully",
      data: message,
    };
  } catch (error) {
    console.error("Error adding or updating reaction:", error);
    throw error;
  }
};

export const removeReaction = async (
  messageId: string,
  reactionObj: ReactionType
) => {
  const validation = reactionValidate.safeParse(reactionObj);

  if (!validation.success) {
    const errorDetails = validation.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    throw new Error(JSON.stringify(errorDetails));
  }

  try {
    const message = await messageModel.findById(messageId);
    if (!message) {
      throw new Error("Message not found");
    }

    const reactionIndex = message.reactions.findIndex(
      (reaction) =>
        reaction.emoji === validation.data.emoji &&
        reaction.userId === validation.data.userId
    );

    if (reactionIndex === -1) {
      throw new Error("Reaction not found");
    }

    message.reactions.splice(reactionIndex, 1);
    await message.save();

    return {
      message: "Reaction removed successfully",
      data: message,
    };
  } catch (error) {
    console.error("Error removing reaction:", error);
    throw error;
  }
};
