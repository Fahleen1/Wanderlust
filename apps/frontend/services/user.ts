import axios from 'axios';

export const loginUser = async (
  username: string,
  email: string,
  password: string,
) => {
  console.log('Sending request with:', { username, email, password });

  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/user/login',
      { username, email, password },
      { withCredentials: true },
    );

    console.log('Login response:', response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Login error:', error.response?.data || error.message);
    } else {
      console.error('Login error:', error);
    }
    return null;
  }
};
