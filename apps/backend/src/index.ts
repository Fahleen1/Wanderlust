import dotenv from 'dotenv';

import { app } from './app';
import { connectToDB } from './config/mongoose';

dotenv.config();
const port: number = parseInt(process.env.BACKEND_PORT || '3002', 10);

connectToDB();
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
