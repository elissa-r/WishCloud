import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRouter } from './routes/UserRoutes';
import { wishlistRouter } from './routes/WishlistRoutes';

dotenv.config();
// App class to configure and run the Express application
class App {
  public express: express.Application;

// Initialize the application
  constructor() {
    this.express = express();
    this.middleware();
    this.database();
    this.routes();
  }
// Configure middleware
  private middleware(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
  }
// Connect to MongoDB
  private database(): void {
    const mongoURI = process.env.MONGO_URI || '';
    mongoose.connect(mongoURI)
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log('MongoDB error:', err));
  }
// Define application routes
  private routes(): void {
    this.express.use('/api/users', userRouter);
    this.express.use('/api/wishlists', wishlistRouter);
    // Basic route for testing
    this.express.get('/', (req, res) => {
      res.send('WishCloud API is running');
    });
  }
}

export { App };
