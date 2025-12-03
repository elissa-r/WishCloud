import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { userRouter } from './routes/UserRoutes';
import { wishlistRouter } from './routes/WishlistRoutes';
import { itemRouter } from './routes/ItemRoutes';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(express.static('public'));
  }

  private routes(): void {
    this.express.use('/api/users', userRouter);
    this.express.use('/api/wishlists', wishlistRouter);
    this.express.use('/api/items', itemRouter);
  }
}

export { App };
