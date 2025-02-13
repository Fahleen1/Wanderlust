import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(
    'http://localhost:3001/api/v1/user/login',
    { email, password },
    { withCredentials: true },
  );
  return response.data;
};
