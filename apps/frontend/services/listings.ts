import { Add_Listing, PUT_Listing } from '../types/listings';
import axios from 'axios';

export const getListings = async () => {
  const response = await axios.get('http://localhost:3001/api/v1/listings');
  console.log('Response:', response);
  return response.data;
};

export const getListing = async (id: string) => {
  const response = await axios.get(
    `http://localhost:3001/api/v1/listings/listing/${id}`,
  );
  return response.data;
};

export const createListing = async (params: Add_Listing) => {
  const response = await axios.post(
    'http://localhost:3001/api/v1/listings/add',
    params,
  );
  return response.data;
};

export const editListing = async (id: string, data: PUT_Listing) => {
  const response = await axios.put(
    `http://localhost:3001/api/v1/listings/edit/${id}`,
    data,
  );
  return response;
};

export const deleteListing = async (id: string) => {
  await axios.delete(`http://localhost:3001/api/v1/listings/${id}`);
};
