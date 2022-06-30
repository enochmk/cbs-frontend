import adjustAccountApi from '../api/cbs/adjustAccount.api';
import outputLogger from '../functions/outputLogger';
import { ISingleRequest } from '../interfaces/IRequest';

const processSingleRequest = async (request: ISingleRequest) => {
	const { item, destination } = request;

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
};

export default processSingleRequest;
