import { NextFunction, Request, Response } from 'express';
// import { nanoid } from 'nanoid';

const handleRequestID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.requestID = Date.now().toString();
	next();
};

export default handleRequestID;
