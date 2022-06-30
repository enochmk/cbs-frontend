import { Request, Response } from 'express';

import asyncHandler from '../../middlewares/async.middleware';
import adjustAccountService from '../../services/batch/adjustAccount.service';
import HttpError from '../../utils/errors/HttpError';
import { BatchRequestInput } from '../../validations/request.schema';

const adjustAccountController = asyncHandler(
	async (req: Request<{}, {}, BatchRequestInput>, res: Response) => {
		if (!req.file) throw new HttpError('Please upload a file', 400);

		const result = await adjustAccountService({
			agentID: req.body.agentID,
			requestID: res.locals.requestID,
			file: req.file,
		});

		if (req.query.download === 'true') {
			return res.download(result.outputDestination);
		}

		return res.json({ ...result });
	}
);

export default adjustAccountController;
