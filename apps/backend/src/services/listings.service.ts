import { Listings } from '../models/listings';

export const getAllListings = async () => {
  const listings = Listings.find();
  return listings;
};

export const getListingById = async (id: string) => {
  const listing = Listings.findById(id);
  return listing;
};

export const addListings = async (
  title: string,
  desc: string,
  imageUrl: string,
  price: number,
  location: string,
  country: string,
) => {
  const newListing = Listings.create({
    title: title,
    description: desc,
    image: {
      url: imageUrl,
    },
    price: price,
    location: location,
    country: country,
  });

  return newListing;
};
