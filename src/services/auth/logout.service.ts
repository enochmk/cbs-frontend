import axios from '../../customs/axios';

// logout user
const logoutService = async () => {
  await axios.post('/auth/logout');
};

export default logoutService;
