import { NextFunction, Request, Response } from 'express';
import logger from '../utils/loggers/logger';

// eslint-disable-next-line no-unused-vars
const errorHandler = (
	error: any,
	req: Request,
	res: Response,
	_: NextFunction
) => {
	logger.error(error.message, error?.context);
	res.send(error.message);
};

export default errorHandler;
