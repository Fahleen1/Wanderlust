import { Add_Listing } from '../types/listings';
import axios from 'axios';

export const getListings = async () => {
  const response = await axios.get('/api/v1/listings');
  console.log('Response:', response);
  return response.data;
};

export const getListing = async (id: string) => {
  const response = await axios.get(`/api/v1/listing/${id}`);
  return response.data;
};

export const addListing = async (params: Add_Listing) => {
  const response = await axios.post('/api/v1/listings/add', params);
  return response.data;
};
