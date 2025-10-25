import express from 'express';
import { User } from '../models/UserModel';

export const userRouter = express.Router();

// GET all users
userRouter.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET user by id
userRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// POST create new user
userRouter.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});