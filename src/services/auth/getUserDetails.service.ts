import axios from '../../customs/axios';
import { IUserResponse } from '../../interfaces/IUser';

// get user details
const getUserDetailsService = async (
  accessToken: string
): Promise<IUserResponse> => {
  const response = await axios.get('/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export default getUserDetailsService;
