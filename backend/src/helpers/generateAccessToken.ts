import config from 'config';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN: string = config.get('jwt.accessToken');

const generateAccessToken = (data: any) => {
	const accessToken = jwt.sign(data, ACCESS_TOKEN, {
		expiresIn: config.get('jwt.accessExpiresIn'),
	});

	return accessToken;
};

export default generateAccessToken;
