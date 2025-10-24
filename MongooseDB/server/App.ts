import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import { userRouter } from './routes/userRoutes';
import { wishlistRouter } from './routes/wishListRoutes';
import * as dotenv from 'dotenv';

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
