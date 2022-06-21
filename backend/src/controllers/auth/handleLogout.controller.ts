import config from 'config';
import { Request, Response } from 'express';

import asyncHandler from '../../middlewares/async.middleware';
import clearUserRefreshToken from '../../models/auth/clearUserRefreshToken.model';
import getUserByRefreshToken from '../../models/auth/getUserByRefreshToken.model';

// @desc clear cookie and refreshToken from database
const handleLogout = asyncHandler(async (req: Request, res: Response) => {
	const cookies = req.cookies;

	// ! No cookie set
	if (!cookies?.jwt) {
		return res.sendStatus(204);
	}

	// get refresh token from cookie
	const refreshToken = cookies.jwt;

	// get the user of this refresh token
	const user = await getUserByRefreshToken(refreshToken);

	// clear refresh token from db
	if (user) {
		await clearUserRefreshToken(user?.USERNAME);
	}

	// clear cookie
	res.clearCookie('jwt', {
		httpOnly: true,
		sameSite: true,
		// secure: true,
	});

	// send response
	return res.sendStatus(204);
});

export default handleLogout;
