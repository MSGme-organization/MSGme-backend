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
  username: z.string({ required_error: "Username is required" }).trim().min(1),
  fullName: z.string({ required_error: "Full Name is required" }).trim().min(1),
  userId: z.string({ required_error: "User ID is not found" }).trim().min(1),
  roomId: z.string({ required_error: "Room ID is not found" }).trim().min(1),
  avatar: z.string().optional(),
  message: z.string({ required_error: "Message is not found" }).trim().min(1),
  iv: z.string().trim().min(1),
  repliedMsgId: z.string().nullable().optional(),
  reactions: z.array(reactionValidate).optional().nullable(),
  isDeleted: z.boolean().default(false),
  isForward: z.boolean().default(false),
  isEdited: z.boolean().default(false),
});

export type MessageDataType = z.infer<typeof messageValidate>;
export type ReactionType = z.infer<typeof reactionValidate>;
