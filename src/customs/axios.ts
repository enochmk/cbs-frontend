import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
