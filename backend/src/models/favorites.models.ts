import mongoose, { Schema } from "mongoose";

const favSchema = new Schema({
  fav_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  birthyear: {
    type: String,
  },
  deathyear: {
    type: String,
  },
  nationality: {
    type: String,
  },
  bg_img: {
    type: String,
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
});

export const Favourites = mongoose.model("Favourites", favSchema);
