import axios from '../../customs/axios';
import { ILoginInput } from '../../interfaces/IUser';

// login user
const loginService = async (input: ILoginInput) => {
  const response = await axios.post('/auth/login', input);
  return response.data;
};

export default loginService;
