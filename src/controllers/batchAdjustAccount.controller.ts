import { Request, Response } from 'express';

import asyncHandler from '../middlewares/async.middleware';
import batchService from '../services/batchAdjustAccount.services';
import HttpError from '../utils/errors/HttpError';
import { BatchRequestInput } from '../validations/request.schema';

const batchAdjustAccount = asyncHandler(
	async (req: Request<{}, {}, BatchRequestInput>, res: Response) => {
		const data = req.body;
		const file = req.file;

		res.send({
			data,
			file,
		});
	}
);

export default batchAdjustAccount;
