import express from 'express';
import { Wishlist } from '../models/WishlistModel';

export const wishlistRouter = express.Router();

// GET all wishlists
wishlistRouter.get('/', async (req, res) => {
  const wishlists = await Wishlist.find().populate('userId');
  res.json(wishlists);
});

// GET wishlist by id
wishlistRouter.get('/:id', async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id).populate('userId');
  res.json(wishlist);
});

// POST create new wishlist
wishlistRouter.post('/', async (req, res) => {
  const wishlist = new Wishlist(req.body);
  await wishlist.save();
  res.json(wishlist);
});
