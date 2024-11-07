import mongoose from "mongoose";

export type Reaction = {
  emoji: string;
  userId: string;
  timestamp: Date;
};

const reactionSchema = new mongoose.Schema<Reaction>({
  emoji: { type: String, required: true },
  userId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
const messageSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    fullName: { type: String, require: true },
    roomId: String,
    avatar: { type: String },
    message: { type: String, require: true },
    iv: { type: String, require: true },
    repliedMsgId: { type: mongoose.Schema.Types.ObjectId },
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
