import config from 'config';
import jwt from 'jsonwebtoken';

import { IPayload } from '../interfaces/User.interface';

const REFRESH_TOKEN: string = config.get('jwt.refreshToken');

const verifyRefreshToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, REFRESH_TOKEN) as IPayload;
		return decoded;
	} catch (error: any) {
		let message = error.message;

		message = message.includes('jwt expired')
			? 'Session has expired. Please login again to continue.'
			: message;

		message = message.includes('invalid signature')
			? 'Invalid signature. Please login again'
			: message;

		throw new Error(message);
	}
};

export default verifyRefreshToken;
