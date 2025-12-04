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
  this.express.use(cors({
    origin: [
      'http://localhost:4200',
      'https://wishcloud.azurewebsites.net'
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  }));

  this.express.use(bodyParser.json());
  this.express.use(express.static('public'));
}

  private routes(): void {
    // API routes
    this.express.use('/api/users', userRouter);
    this.express.use('/api/wishlists', wishlistRouter);
    this.express.use('/api/items', itemRouter);

    // Serve Angular frontend static files
    this.express.use(express.static(path.join(__dirname, 'angular', 'browser')));

    // Fallback for Angular routing
    this.express.use((req, res) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).send('API route not found');
      }
      res.sendFile(path.join(__dirname, 'angular', 'browser', 'index.html'));
    });
  }
}

export { App };
