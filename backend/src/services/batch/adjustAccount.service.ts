import fs from 'fs';

import { IAdjustAccountRequest } from '../../api/cbs/adjustAccount.api';
import createOutputDestination from '../../functions/createOutputDestination';
import processBatchSubset from '../../helpers/processBatchSubset';
import { IBatchRequest } from '../../interfaces/IRequest';

// const LIMIT = config.get('tps') as Number;
const LIMIT = 50;

const adjustAccountService = async (request: IBatchRequest) => {
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

	const temp = [];
	for (let index = 0; index < batchData.length; index++) {
		temp.push(batchData[index]);

		if (temp.length === LIMIT || index === batchData.length - 1) {
			// proccess all the requests in parallel
			await processBatchSubset(temp, outputDestination);

			// empty subset array
			while (temp.length) temp.pop();
		}
	}

	// return the output file destination
	return { outputDestination };
};

export default adjustAccountService;
