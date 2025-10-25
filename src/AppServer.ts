import { App } from './App';
import dotenv from 'dotenv';
//import { connectDB } from './config/db';

dotenv.config();
//connectDB();

const port = process.env.PORT || 3000;

const server = new App().express;
server.listen(port, () => {
  console.log(`WishCloud server running on http://localhost:${port}`);
});
