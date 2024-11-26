import mongoose from "mongoose";
import { MessageDataType, ReactionType } from "../helper/zodValidation";

const reactionSchema = new mongoose.Schema<ReactionType>({
  emoji: { type: String, required: true },
  username: { type: String, required: true },
  userId: { type: String, required: true },
  avatar: { type: String },
  timestamp: { type: Date, default: Date.now },
});
const messageSchema = new mongoose.Schema<MessageDataType>(
  {
    username: { type: String, require: true },
    fullName: { type: String, require: true },
    roomId: String,
    userId: String,
    avatar: { type: String },
    message: { type: String, require: true },
    iv: { type: String, require: true },
    repliedMsgId: { type: String },
    reactions: { type: [reactionSchema], require: false },
  },
  { timestamps: true }
);
messageSchema.virtual("repliedMsg", {
  ref: "Message",
  localField: "repliedMsgId",
  foreignField: "_id",
  justOne: true,
});
messageSchema.set("toObject", { virtuals: true });
messageSchema.set("toJSON", { virtuals: true });
const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
