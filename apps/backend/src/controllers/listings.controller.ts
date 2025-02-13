import {
  addListings,
  deleteListing,
  editListing,
  getAllListings,
  getListingById,
} from '../services/listings.service';
import { ApiError } from '../utils/ApiError';
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
    const user = req.user._id;
    console.log(user);
    if (!user || !user._id) {
      throw new ApiError(401, 'Unauthorized: User not logged in');
    }
    const listing = await addListings(
      title,
      desc,
      image,
      price,
      location,
      country,
      user,
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
    const title = req.body.title;
    const desc = req.body.description;
    const image = req.body.image.url;
    const price = req.body.price;
    const location = req.body.location;
    const country = req.body.country;
    const updatedListing = await editListing(
      id,
      title,
      desc,
      image,
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

export const checkListingOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const listingId = req.params.id;
    const userId = req.user._id;

    const listing = await getListingById(listingId);
    if (!listing) throw new ApiError(404, 'Listing not found');

    // Check if the logged-in user is the owner
    if (listing.user.toString() !== userId.toString()) {
      throw new ApiError(
        403,
        'You are not authorized to edit/delete this listing',
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
