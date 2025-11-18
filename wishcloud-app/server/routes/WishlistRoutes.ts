import express from 'express';
import { Wishlist } from '../../server/models/WishlistModel';
import { Router } from 'express';

export const wishlistRouter = Router();

// POST - create a new wishlist
wishlistRouter.post('/', async (req, res) => {
  try {
    const newWishlist = new Wishlist(req.body);
    await newWishlist.save();
    res.status(201).json(newWishlist);
  } catch (err) {
    console.error('Error creating wishlist:', err);
    res.status(500).json({ message: 'Server error while creating wishlist.' });
  }
});

// GET - get all wishlists
wishlistRouter.get('/', async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.status(200).json(wishlists);
  } catch (err) {
    console.error('Error fetching wishlists:', err);
    res.status(500).json({ message: 'Server error while fetching wishlists.' });
  }
});


// GET - get wishlists by userID
wishlistRouter.get('/user/:userID', async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ userID: req.params.userID });
    if (!wishlists || wishlists.length === 0) {
      return res.status(200).json([]); // return empty array if none found
    }
    res.status(200).json(wishlists);
  } catch (err) {
    console.error('Error fetching wishlists for user:', err);
    res.status(500).json({ message: 'Server error while fetching user wishlists.' });
  }
});

// GET - get a wishlist by ID
wishlistRouter.get('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.status(200).json(wishlist);
  } catch (err) {
    console.error('Error fetching wishlist by ID:', err);
    res.status(500).json({ message: 'Server error while fetching wishlist.' });
  }
});