import express, { Express } from 'express';

import listingroute from './routes/listings.route';

export const app: Express = express();

app.use('/api', listingroute);
