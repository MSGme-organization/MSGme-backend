import { z } from "zod";

export const reactionValidate = z.object({
  emoji: z.string({ required_error: "Emoji not found" }),
  userId: z.string({ required_error: "User ID not found" }),
  username: z.string({ required_error: "Username required" }),
  avatar: z.string().optional(),
  timestamp: z.preprocess((value) => {
    if (typeof value === "string" || value instanceof Date) {
      return new Date(value);
    }
    return value;
  }, z.date({ required_error: "Timestamp must be a valid date" })),
});

export const messageValidate = z.object({
  username: z.string({ required_error: "Username is required" }),
  fullName: z.string({ required_error: "Full Name is required" }),
  userId: z.string({ required_error: "User ID is not found" }),
  roomId: z.string({ required_error: "Room ID is not found" }),
  avatar: z.string().optional(),
  message: z.string({ required_error: "Message is not found" }).trim(),
  iv: z.string(),
  repliedMsgId: z.string().optional(),
  reactions: z.array(reactionValidate).optional().nullable(),
});

export type MessageDataType = z.infer<typeof messageValidate>;
export type ReactionType = z.infer<typeof reactionValidate>;
