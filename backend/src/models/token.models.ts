import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema({
  token: { type: String, required: [true, "token is required"] },
  expires_at: {
    type: Date,
    required: [true, "expires_at is required"],
  },
});

export const Tokens = mongoose.model("Tokens", tokenSchema);
