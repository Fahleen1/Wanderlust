import axios from 'axios';

// export const loginUser = async (email?: string, password?: string) => {
//   const response = await axios.post(
//     `/api/v1/user/login`,
//     { email, password },
//     {
//       withCredentials: true,
//     },
//   );
//   return response.data;
// };

export const loginUser = async (email: string, password: string) => {
  console.log('Sending request with:', { email, password });

  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/user/login', // <-- Ensure full backend URL
      { email, password },
      { withCredentials: true },
    );

    console.log('Login response:', response.data); // Debugging

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
