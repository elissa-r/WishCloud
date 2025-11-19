import { App } from './App';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from "morgan";



dotenv.config();

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connected');
    

    const server = new App().express;
    server.listen(port, () => {
      console.log(`WishCloud server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

startServer();
