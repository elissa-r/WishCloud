import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  itemId: { type: Number },
  photoLink: { type: String },
  price: { type: Number },
  description: { type: String },
  itemLink: { type: String },
  isReserved: { type: Boolean },
});

export const Item = mongoose.model('Item', itemSchema);
