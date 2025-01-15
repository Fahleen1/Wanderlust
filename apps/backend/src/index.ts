import dotenv from 'dotenv';

import { app } from './app';

dotenv.config();
const port: number = parseInt(process.env.BACKEND_PORT || '3002', 10);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
