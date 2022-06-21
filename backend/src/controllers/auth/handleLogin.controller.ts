import config from 'config';
import { Request, Response } from 'express';

import asyncHandler from '../../middlewares/async.middleware';
import loginWithUsernameAndPassword from '../../services/auth/usernameAndPassword.service';

const COOKIE_AGE: number = config.get('cookie.age');

// @desc generate an access token
const handleLogin = asyncHandler(async (req: Request, res: Response) => {
	const auth = await loginWithUsernameAndPassword(
		req.body.username,
		req.body.password
	);

	// sign cookie
	res.cookie('jwt', auth.refreshToken, {
		httpOnly: true,
		sameSite: true,
		// secure: true,
		maxAge: COOKIE_AGE,
	});

	// send response
	return res.json({ accessToken: auth.accessToken });
});

export default handleLogin;
