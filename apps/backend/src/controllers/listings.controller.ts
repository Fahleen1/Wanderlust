import { getAllListings } from '../services/listings.service';
import { NextFunction, Request, Response } from 'express';

export const getAllListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const listings = await getAllListings();
    res.status(200).json(listings);
  } catch (err) {
    console.log('Error getting listings');
    res.status(500).json({ err: 'Error retreiving listings' });
    next(err);
  }
};
