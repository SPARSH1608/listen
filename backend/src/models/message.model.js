import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);
export const Message = mongoose.model('Message', albumSchema);
