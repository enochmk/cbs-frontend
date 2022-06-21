import config from 'config';
import jwt from 'jsonwebtoken';

const REFRESH_TOKEN: string = config.get('jwt.refreshToken');

const generateRefreshToken = (data: any) => {
	const refreshToken = jwt.sign(data, REFRESH_TOKEN, {
		expiresIn: config.get('jwt.refreshExpiresIn'),
	});

	return refreshToken;
};

export default generateRefreshToken;
