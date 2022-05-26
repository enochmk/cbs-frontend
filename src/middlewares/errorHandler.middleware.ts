import { NextFunction, Request, Response } from 'express';
import moment from 'moment';

// eslint-disable-next-line
const errorHandler = (error: any, req: Request, res: Response, _next: NextFunction) => {
	const requestID = res.locals.requestID;

	const response = {
		timestamp: moment(),
		requestID,
		message: error.message,
	};

	return res.status(500).json(response);
};

export default errorHandler;
