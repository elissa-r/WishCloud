
import * as mongoose from 'mongoose';

// Define the schema (structure) for each wishlist item
const wishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },        
  itemId: { type: Number, required: true },      
  photoLink: { type: String },                  
  price: { type: Number },                     
  description: { type: String },               
  itemLink: { type: String },                   
  isReserved: { type: Boolean, default: false }  
});

// Create and export the Mongoose model
export const Wishlist = mongoose.model('Wishlist', wishlistSchema);
