import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  listId: { type: Number },
  userID: { type: String, required: true },
  photoLink: { type: String },
  date: { type: Date } ,
  budget: { type: Number },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  shareId: { type: String, default: null }
});

export const Wishlist =
  mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);

