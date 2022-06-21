import { NextFunction, Request, Response } from 'express';

import asyncHandler from '../../middlewares/async.middleware';
import HttpError from '../../utils/errors/HttpError';
import verifyRefreshToken from '../../helpers/jwtHandler';
import generateAccessToken from '../../helpers/generateAccessToken';
import getUserByUsername from '../../models/auth/getUserByUsername.model';

// @desc use cookie to generate new access token
const handleRefreshToken = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		// get cookie from request
		const cookies = req.cookies;

		// ! No cookie set
		if (!cookies?.jwt) {
			return next(new HttpError('You are not logged in. Please log in.', 401));
		}

		// get refresh token from cookie
		const refreshToken = cookies.jwt;

		try {
			// decode refresh token
			const decoded = verifyRefreshToken(refreshToken);

			// get the user data for the decoded refresh token via username
			const user = await getUserByUsername(decoded.user.username);

			// ! user does not exist
			if (!user) return next(new HttpError('Not Authorized', 401));

			// ? generate new access token
			const accessToken = generateAccessToken({ user: decoded.user });

			// * send response
			return res.json({ accessToken });
		} catch (error: any) {
			// ! unable to grant new access token
			return next(new HttpError(error.message, 401));
		}
	}
);

export default handleRefreshToken;
