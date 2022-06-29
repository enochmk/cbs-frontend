import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import asyncHandler from '../../middlewares/async.middleware';
import { DownloadFileInput } from '../../validations/download.schema';
import HttpError from '../../utils/errors/HttpError';

const outputFile = asyncHandler(
	async (req: Request<{}, {}, {}, DownloadFileInput>, res: Response) => {
		const filePath = req.query.path;

		// ! file not found
		if (!fs.existsSync(filePath)) throw new HttpError('File not found', 404);

		const fileName = path.basename(filePath);

		return res.download(filePath, fileName);
	}
);

export default outputFile;
