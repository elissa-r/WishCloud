import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { userRouter } from './routes/UserRoutes';
import { wishlistRouter } from './routes/WishlistRoutes';
import { itemRouter } from './routes/ItemRoutes';
import * as dotenv from 'dotenv';

dotenv.config();

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(cors({ origin: 'http://localhost:4200'}));
    this.express.use(bodyParser.json());
    this.express.use(express.static('public'));
  }

  private routes(): void {
    this.express.use('/api/users', userRouter);
    this.express.use('/api/wishlists', wishlistRouter);
    this.express.use('/api/items', itemRouter);
  }

  private async database(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_URI!);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }
}

export { App };
