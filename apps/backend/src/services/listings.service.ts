import { Listings } from '../models/listings';
import mongoose from 'mongoose';

export const getAllListings = async () => {
  const listings = Listings.find();
  return listings;
};
