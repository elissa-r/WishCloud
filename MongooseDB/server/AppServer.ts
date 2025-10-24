import * as dotenv from 'dotenv';
import { App } from './App';

dotenv.config();

const port = process.env.PORT || 3000;

const server = new App().express;
server.listen(port, () => {
  console.log(`WishCloud server running on http://localhost:${port}`);
});
