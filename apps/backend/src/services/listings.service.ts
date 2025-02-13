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
  user: string,
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
    user: user,
  });

  return newListing;
};

export const editListing = async (
  id: string,
  title: string,
  desc: string,
  imageUrl: string,
  price: number,
  location: string,
  country: string,
) => {
  const updatedListing = await Listings.findByIdAndUpdate(
    id,
    {
      title,
      description: desc,
      image: { url: imageUrl },
      price,
      location,
      country,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return updatedListing;
};

export const deleteListing = async (id: string) => {
  const listing = await Listings.findByIdAndDelete(id);
};
