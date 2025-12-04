import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
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
  }

  private routes(): void {
    // API routes
    this.express.use('/api/users', userRouter);
    this.express.use('/api/wishlists', wishlistRouter);
    this.express.use('/api/items', itemRouter);

    // Serve Angular frontend from dist/angular
    this.express.use(express.static(path.join(__dirname, 'angular')));

    // Fallback for Angular client-side routing
    this.express.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'angular', 'index.html'));
    });
  }
}

export { App };
