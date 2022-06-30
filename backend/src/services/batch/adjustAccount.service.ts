import config from 'config';
import fs from 'fs';

import { IAdjustAccountRequest } from '../../api/cbs/adjustAccount.api';
import createOutputDestination from '../../functions/createOutputDestination';
import processMultipleRequests from '../../helpers/processMultipleRequests';
import { IBatchRequest } from '../../interfaces/IRequest';

const LIMIT = config.get('tps') as Number;

const adjustAccountService = async (request: IBatchRequest) => {
	const { agentID, file, requestID } = request;

	// split file contents into array
	const rows: string[] = fs.readFileSync(file.path, 'utf8').split('\n');

	const rowsData = rows.map((row: string): IAdjustAccountRequest => {
		let data = row.replace('\r', '').split('|');

		return {
			msisdn: data?.[0],
			accountType: data?.[1],
			remark: data?.[2],
			amount: 0,
			requestID,
			agentID,
		};
	});

	// create a directory with requestID as filename
	const destination = createOutputDestination(requestID);

	const temp = [];
	for (let index = 0; index < rowsData.length; index++) {
		temp.push(rowsData[index]);

		if (temp.length === LIMIT || index === rowsData.length - 1) {
			// proccess all the requests in parallel
			await processMultipleRequests({
				destination,
				items: temp,
			});

			// empty subset array
			while (temp.length) temp.pop();
		}
	}

	// return the output file destination
	return { outputDestination: destination };
};

export default adjustAccountService;
