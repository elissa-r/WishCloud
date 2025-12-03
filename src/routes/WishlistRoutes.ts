import { Router } from 'express';
import { Wishlist } from '../models/WishlistModel';
import { Item } from '../models/ItemModel';   
import { v4 as uuidv4 } from 'uuid'; //import for shareId generation

export const wishlistRouter = Router();


// CREATE WISHLIST
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


// GET ALL WISHLISTS
wishlistRouter.get('/', async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.status(200).json(wishlists);
  } catch (err) {
    console.error('Error fetching wishlists:', err);
    res.status(500).json({ message: 'Server error while fetching wishlists.' });
  }
});


// GET WISHLISTS BY USER
wishlistRouter.get('/user/:userID', async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ userID: req.params.userID });
    res.status(200).json(wishlists);
  } catch (err) {
    console.error('Error fetching wishlists for user:', err);
    res.status(500).json({ message: 'Server error while fetching user wishlists.' });
  }
});


// ADD ITEM TO WISHLIST
wishlistRouter.post('/:id/items', async (req, res) => {
  try {
    const wishlistId = req.params.id;

    console.log("Add item request received:", req.body);

    // 1. Create Item
    const newItem = new Item(req.body);
    await newItem.save();

    // 2. Find wishlist
    const wishlist = await Wishlist.findById(wishlistId);

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // IMPORTANT FIX: ensure items array exists
    if (!Array.isArray(wishlist.items)) {
      console.log("Wishlist had no items array. Creating one.");
      wishlist.items = [];
    }

    // Add item to wishlist
    wishlist.items.push(newItem._id);

    await wishlist.save();

    console.log("Item added successfully:", newItem);

    res.status(201).json(newItem);

  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).json({ message: "Server error while adding item" });
  }
});

// GET ITEMS FOR A WISHLIST - MUST COME FIRST
wishlistRouter.get('/:id/items', async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id).populate('items');
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.json(wishlist.items);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ message: "Server error while fetching items" });
  }
});

// GET WISHLIST BY ID
wishlistRouter.get('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id).populate('items');
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.status(200).json(wishlist);
  } catch (err) {
    console.error('Error fetching wishlist by ID:', err);
    res.status(500).json({ message: 'Server error while fetching wishlist.' });
  }
});

// SHARE WISHLIST - GENERATE SHAREABLE LINK
wishlistRouter.post('/:id/share', async (req, res) => {
  try {
    const wishlistId = req.params.id;

    if (!wishlistId) {
      return res.status(400).json({ error: 'Missing wishlist id' });
    }

    const shareUrl = `${process.env.FRONTEND_URL}/wishlists/shared/${wishlistId}`;
    
    res.json({ shareUrl });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


// ACCESS SHARED WISHLIST VIA SHARE ID
wishlistRouter.get('/share/:shareId', async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ shareId: req.params.shareId })
            .populate('items');

        if (!wishlist) return res.status(404).json({ message: "Invalid share link" });

        res.json(wishlist);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});




