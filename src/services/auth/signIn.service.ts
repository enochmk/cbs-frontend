import axios from '../../customs/axios';
import { ILoginInput } from '../../interfaces/IUser';

// login user
const signInService = async (input: ILoginInput) => {
  const response = await axios.post('/auth/login', input);
  const accessToken = response.data.accessToken as string;
  return accessToken;
};

export default signInService;
