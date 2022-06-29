import { Request, Response, NextFunction } from 'express';

import decodeToken from '../helpers/decodeToken';
import HttpError from '../utils/errors/HttpError';
import getDetails from '../services/profile/getDetails.service';

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.headers?.authorization;

	// ! authorization header is not present
	if (!authorization) return next(new HttpError('Not Authorized', 401));

	// ! authorization header is present but not in the correct format
	if (!authorization.startsWith('Bearer'))
		return next(new HttpError('Invalid Authorization', 400));

	// get the token
	const token = authorization.split(' ')[1];

	try {
		// verify the token
		const decoded = decodeToken(token);

		// get user data
		const user = await getDetails(decoded.user.username);

		// ! user not found
		if (!user) return next(new HttpError('User not found', 404));

		// ! account disabled
		if (!user.active) return next(new HttpError('User is not active', 401));

		// save user data to request
		res.locals.user = user;

		// next middleware
		return next();
	} catch (error: any) {
		let message = error.message;

		// ! handle expired token
		if (message.includes('jwt expired'))
			message = 'Token expired. Please login again';

		// ! handle invalid signature
		if (message.includes('invalid signature'))
			message = 'Invalid token. Please login again';

		return next(new HttpError(message, 401));
	}
};

export default verifyJWT;
