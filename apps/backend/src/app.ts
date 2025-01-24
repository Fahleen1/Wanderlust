import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';

import { prefix } from './apiVersion/v1';
import listingroute from './routes/listings.route';

export const app: Express = express();

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
app.use(`${prefix}/`, listingroute);
