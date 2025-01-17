import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const DB_CONNECTION_URL = process.env.DB_CONNECTION || '';

export async function connectToDb() {
  try {
    await mongoose.connect(DB_CONNECTION_URL);
    console.log('Connection successful');
  } catch (err) {
    console.log('Error establishing connection', err);
  }
}
