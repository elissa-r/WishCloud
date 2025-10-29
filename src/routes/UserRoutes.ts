import express from   'express';  
import { User } from '../models/UserModel';
import { Router } from 'express';

export const userRouter = Router();

// POST - create a new user
userRouter.post('/', async (req, res) => {
  try {
    console.log('Received POST /api/users:', req.body);
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Server error while creating user.' });
  }

});

// GET - get all users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
});

// GET - get a user by ID
userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ message: 'Server error while fetching user.' });
  }
});



