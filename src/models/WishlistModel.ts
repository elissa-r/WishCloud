import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  listId: Number,
  userID: { type: String, required: true },
  photoLink: String,
  date: Date,
  budget: Number,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }]
});

export const Wishlist =
  mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);

