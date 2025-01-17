import cors from 'cors';
import express, { Express } from 'express';

import listingroute from './routes/listings.route';

export const app: Express = express();

app.use(cors());
app.use('/api', listingroute);
