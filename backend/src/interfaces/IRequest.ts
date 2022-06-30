import { IAdjustAccountRequest } from '../api/cbs/adjustAccount.api';

export interface IBatchRequest {
	agentID: string;
	requestID: string;
	file: Express.Multer.File;
}

export interface ISingleRequest {
	item: IAdjustAccountRequest;
	destination: string;
}

export interface IMultipleRequests {
	items: IAdjustAccountRequest[];
	destination: string;
}
