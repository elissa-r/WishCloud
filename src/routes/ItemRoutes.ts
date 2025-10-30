import express from 'express';
import { Item } from '../models/ItemModel';
import { Router } from 'express';

export const itemRouter = Router();

// POST - create a new item
itemRouter.post('/', async (req, res) => {
  try {
    console.log('Received POST /api/items:', req.body);
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ message: 'Server error while creating item.' });
  }
});

// GET - get all items
itemRouter.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Server error while fetching items.' });
  }
});

// GET - get an item by ID
itemRouter.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (err) {
    console.error('Error fetching item by ID:', err);
    res.status(500).json({ message: 'Server error while fetching item.' });
  }
});
