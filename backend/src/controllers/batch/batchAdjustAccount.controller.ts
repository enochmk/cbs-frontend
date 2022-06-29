import { Request, Response } from 'express';

import asyncHandler from '../../middlewares/async.middleware';
import batchService from '../../services/batch/adjustAccount.service';
import HttpError from '../../utils/errors/HttpError';
import { BatchRequestInput } from '../../validations/request.schema';

const batchAdjustAccount = asyncHandler(
	async (req: Request<{}, {}, BatchRequestInput>, res: Response) => {
		if (!req.file) throw new HttpError('Please upload a file', 400);

		const result = await batchService({
			agentID: req.body.agentID,
			requestID: res.locals.requestID,
			file: req.file,
		});

		// return res.json(result);
		// const downloadFile = `${result.outputDestination}`
		const downloadFile = `public/outputs/20220629/ukAtXq4hEcHG0KjdoyAy6.log`;
		res.download(downloadFile, 'output.log');
		// res.send(downloadFile);
	}
);

export default batchAdjustAccount;
