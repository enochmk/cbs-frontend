import { useDispatch } from 'react-redux';

import axios from '../customs/axios';
import { refreshAccessToken } from '../features/auth/authSlice';

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await axios.get('/auth/refresh', {
        withCredentials: true,
      });

      // ? update access token
      dispatch(refreshAccessToken(response.data.accessToken));

      return response.data.accessToken;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  };

  return refresh;
};

export default useRefreshToken;
