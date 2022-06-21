import fs from 'fs';
import config from 'config';

import { IAdjustAccountRequest } from '../../api/cbs/adjustAccount.api';
import adjustAccountApi from '../../api/cbs/adjustAccount.api';
import outputLogger from '../../functions/outputLogger';
import createOutputDestination from '../../functions/createOutputDestination';

interface IRequest {
	agentID: string;
	requestID: string;
	file: Express.Multer.File;
}

const LIMIT = config.get('tps') as Number;

const processBatchSubset = async (
	batch: Array<IAdjustAccountRequest>,
	destination: string
) => {
	batch.map(async (item: IAdjustAccountRequest) => {
		const logInfo = {
			requestID: item.requestID,
			agentID: item.agentID,
			msisdn: item.msisdn,
			status: false,
			message: '',
		};

		try {
			const response = await adjustAccountApi(item);
			logInfo.status = true;
			logInfo.message = response.resultDesc;
		} catch (error: any) {
			logInfo.status = false;
			logInfo.message = error.message;
		} finally {
			outputLogger(destination, logInfo);
		}
	});
};

const batchAdjustAccount = async (request: IRequest) => {
	const { agentID, file, requestID } = request;

	const contentArray = fs.readFileSync(file.path, 'utf8').split('\n');
	const batchData = contentArray.map((line: string): IAdjustAccountRequest => {
		let rowData = line.replace('\r', '').split('|');

		return {
			msisdn: rowData?.[0],
			accountType: rowData?.[1],
			remark: rowData?.[2],
			amount: 0,
			requestID,
			agentID,
		};
	});

	// create a directory with requestID as filename
	const outputDestination = createOutputDestination(requestID);

	const subset = [];
	for (let index = 0; index < batchData.length; index++) {
		subset.push(batchData[index]);
		if (subset.length === LIMIT || index === batchData.length - 1) {
			// proccess all the requests in parallel
			await processBatchSubset(subset, outputDestination);
		}
	}

	// return the output file destination
	return { outputDestination };
};

export default batchAdjustAccount;
