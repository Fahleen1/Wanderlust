import { Add_Listing, PUT_Listing } from '../types/listings';
import axios from 'axios';
import { getSession } from 'next-auth/react';

export const getListings = async () => {
  const response = await axios.get('http://localhost:3001/api/v1/listings');
  return response.data;
};

export const getListing = async (id: string) => {
  const response = await axios.get(
    `http://localhost:3001/api/v1/listings/listing/${id}`,
  );
  return response.data;
};

export const createListing = async (params: Add_Listing) => {
  const session = await getSession();
  if (!session?.accessToken) {
    console.error('No access token available');
    return;
  }
  const response = await axios.post(
    'http://localhost:3001/api/v1/listings/add',
    params,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      withCredentials: true,
    },
  );
  return response.data;
};

export const editListing = async (id: string, data: PUT_Listing) => {
  const session = await getSession();
  if (!session?.accessToken) {
    console.error('No access token available');
    return;
  }
  const response = await axios.put(
    `http://localhost:3001/api/v1/listings/edit/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      withCredentials: true,
    },
  );
  return response;
};

export const deleteListing = async (id: string) => {
  const session = await getSession();
  if (!session?.accessToken) {
    console.error('No access token available');
    return;
  }
  await axios.delete(`http://localhost:3001/api/v1/listings/${id}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    withCredentials: true,
  });
};
