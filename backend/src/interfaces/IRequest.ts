export interface IBatchRequest {
	agentID: string;
	requestID: string;
	file: Express.Multer.File;
}
