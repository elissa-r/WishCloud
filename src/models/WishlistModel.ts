import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  listId: { type: Number },
  userID: { type: String },
  photoLink: { type: String },
  date: { type: Date },
  budget: { type: Number },
});

export const Wishlist = mongoose.model('Wishlist', wishlistSchema);
