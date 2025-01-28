import { Listings } from '../models/listings';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { sampleListings as init_data } from './data';

dotenv.config();

const connection = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;
if (!connection) {
  throw new Error('DB_CONNECTION environment variable is not set');
}

main().catch((err) => console.error(err));

async function main() {
  await mongoose.connect(connection);
}

const initDb = async () => {
  console.log('Database initialized');
  await Listings.deleteMany();
  await Listings.insertMany(init_data);
  console.log('Database initialization complete');
};
initDb();
