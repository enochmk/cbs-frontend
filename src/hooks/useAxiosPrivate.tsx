import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { axiosPrivate } from '../customs/axios';
import useRefreshToken from './useRefreshToken';

// @desc: attach interceptors to axiosPrivate
const useAxiosPrivate = () => {
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const refresh = useRefreshToken();

  useEffect(() => {
    // @desc request interceptor
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config: any) => {
        if (!config?.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // @desc response interceptor
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
