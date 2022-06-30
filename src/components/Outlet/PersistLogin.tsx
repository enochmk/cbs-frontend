import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { refreshAccessToken, setUser } from '../../features/auth/authSlice';
import useRefreshToken from '../../hooks/useRefreshToken';
import getUserDetailsService from '../../services/auth/getUserDetails.service';

// @desc Use cookie to persist login by acquiring access token from server
const PersistLogin = () => {
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const newAccessToken = await refresh();
        const user = await getUserDetailsService(newAccessToken);
        dispatch(refreshAccessToken({ accessToken: newAccessToken }));
        dispatch(setUser({ user }));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [dispatch, refresh, accessToken]);

  return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
};

export default PersistLogin;
