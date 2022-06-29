import axios from '../../customs/axios';
import { IUserResponse } from '../../interfaces/IUser';

// get user details
const getUserDetailsService = async (
  username: string
): Promise<IUserResponse> => {
  const response = await axios.post('/profile', { username });
  return response.data;
};

export default getUserDetailsService;
