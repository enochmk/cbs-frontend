import fs from 'fs';
import moment from 'moment';

interface IContext {
	requestID: string;
	agentID: string;
	msisdn: string;
	status: boolean;
	message: string;
}

const outputLogger = (outputDestination: string, info: IContext): string => {
	const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
	const row = `${timestamp}|${info.agentID}|${info.status
		.toString()
		.toUpperCase()}|${info.msisdn}|${info.message}\n`;

	// write/append to file
	fs.appendFileSync(outputDestination, `${row}`, 'utf-8');
	return row;
};

export default outputLogger;
