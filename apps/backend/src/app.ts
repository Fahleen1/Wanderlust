import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';

import { prefix } from './apiVersion/v1';
import listingroute from './routes/listings.route';
import userroute from './routes/user.route';

export const app: Express = express();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

//Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use(`${prefix}listings`, listingroute);
app.use(`${prefix}user`, userroute);
