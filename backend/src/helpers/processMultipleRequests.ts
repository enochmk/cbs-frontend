import { IAdjustAccountRequest } from '../api/cbs/adjustAccount.api';
import { IMultipleRequests } from '../interfaces/IRequest';
import processSingleRequest from './processsSingleRequest';

const processMultipleRequests = async (request: IMultipleRequests) => {
	const { destination, items } = request;

	const requests = items.map((item: IAdjustAccountRequest) =>
		processSingleRequest({ item, destination })
	);

	await Promise.all(requests);
};

export default processMultipleRequests;
