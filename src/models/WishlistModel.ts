import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  itemId: { type: Number },
  photoLink: { type: String },
  price: { type: Number },
  description: { type: String },
  itemLink: { type: String },
  isReserved: { type: Boolean },
});

export const Wishlist = mongoose.model('Wishlist', wishlistSchema);
