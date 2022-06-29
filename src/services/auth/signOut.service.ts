import axios from '../../customs/axios';

// logout user
const signOutService = async () => {
  await axios.post('/auth/logout');
};

export default signOutService;
