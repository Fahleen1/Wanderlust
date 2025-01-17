import { Listings } from '../models/listings';
import mongoose from 'mongoose';

export const getAllListings = async () => {
  const listings = Listings.find();
  return listings;
};

export const getListingById = async (id: string) => {
  const listing = Listings.findById(id);
  return listing;
};
