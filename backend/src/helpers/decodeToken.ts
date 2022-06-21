import config from 'config';
import jwt from 'jsonwebtoken';

import { IPayload } from '../interfaces/User.interface';

const ACCESS_TOKEN: string = config.get('jwt.accessToken');

const decodeToken = (token: string) => {
	const decoded = jwt.verify(token, ACCESS_TOKEN) as IPayload;
	return decoded;
};

export default decodeToken;
