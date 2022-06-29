import { Request, Response } from 'express';

import asyncHandler from '../../middlewares/async.middleware';

const getDetails = asyncHandler(async (req: Request, res: Response) => {
	const data = res.locals.user;
	return res.json({ user: data });
});

export default getDetails;
