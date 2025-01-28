import {
  addListings,
  deleteListing,
  editListing,
  getAllListings,
  getListingById,
} from '../services/listings.service';
import ApiResponse from '../utils/ApiResponse';
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

export const getListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const listing = await getListingById(id);
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ err: 'Error fetching listing' });
    next(err);
  }
};

export const addListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const title = req.body.title;
    const desc = req.body.description;
    const image = req.body.image.url;
    const price = req.body.price;
    const location = req.body.location;
    const country = req.body.country;
    const listing = await addListings(
      title,
      desc,
      image,
      price,
      location,
      country,
    );
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ err: 'Error adding listing' });
    next(err);
  }
};

export const updateListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, price, country, location } = req.body;
    const updatedListing = await editListing(
      id,
      title,
      description,
      imageUrl,
      price,
      country,
      location,
    );
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedListing, 'Listing updated successfully'),
      );
  } catch (error) {
    next(error);
  }
};

export const removeListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await deleteListing(id);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'Listing deleted successfully'));
  } catch (error) {
    next(error);
  }
};
