import axios from 'axios';

export const getListings = async () => {
  const response = await axios.get('/api/listings');
  console.log('Response:', response);
  return response.data;
};
