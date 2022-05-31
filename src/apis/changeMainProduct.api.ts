import axios from 'axios';
import config from 'config';
import xml2js from 'xml2js';

import { IContext } from '../interfaces/ILogger.interface';
import HttpError from '../utils/errors/HttpError';
import logger from '../utils/loggers/logger';

const URL: string = config.get('api.cbs.url.changeMainProduct');
const USERNAME: string = config.get('api.cbs.username');
const PASSWORD: string = config.get('api.cbs.password');
const SUCCESS_CODE: string = '405000000';

const context: IContext = {
	user: 'CBS',
};

const subscribeProductApi = async (requestID: string, msisdn: string, productID: string) => {
	context.label = 'adjustAccount';
	context.requestID = requestID;
	context.request = { msisdn, productID };

	const soapHeader = {
		headers: {
			'Content-Type': 'text/xml',
			SoapAction: 'ChangeMainProd',
		},
	};

	const soapRequest = `
		<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bus="http://www.huawei.com/bme/cbsinterface/cbs/businessmgrmsg" xmlns:bus1="http://www.huawei.com/bme/cbsinterface/cbs/businessmgr" xmlns:com="http://www.huawei.com/bme/cbsinterface/common">
			<SOAP-ENV:Header/>
			<SOAP-ENV:Body>
					<bus:ChangeMainProdRequestMsg>
						<RequestHeader>
								<com:CommandId>ChangeMainProd</com:CommandId>
								<com:Version>1</com:Version>
								<com:TransactionId>1</com:TransactionId>
								<com:SequenceId>1</com:SequenceId>
								<com:RequestType>Event</com:RequestType>
								<com:SessionEntity>
									<com:Name>${USERNAME}</com:Name>
									<com:Password>${PASSWORD}</com:Password>
									<com:RemoteAddress/>
								</com:SessionEntity>
								<com:SerialNo>${requestID}</com:SerialNo>
						</RequestHeader>
						<ChangeMainProdRequest>
								<bus1:SubscriberNo>${msisdn}</bus1:SubscriberNo>
								<bus1:NewMainProductId>${productID}</bus1:NewMainProductId>
								<bus1:ValidMode>4050000</bus1:ValidMode>
						</ChangeMainProdRequest>
				</bus:ChangeMainProdRequestMsg>
			</SOAP-ENV:Body>
		</SOAP-ENV:Envelope>
   `;

	const soapResponse = await axios.post(URL, soapRequest, soapHeader);
	const jsonResponse = await xml2js.parseStringPromise(soapResponse.data);

	const responseData = jsonResponse['soapenv:Envelope']['soapenv:Body'][0];

	const adjustAccountMessage = responseData.ChangeMainProdResultMsg[0].ResultHeader[0];
	const resultCode = adjustAccountMessage.ResultCode[0]._;
	const resultDescription = adjustAccountMessage.ResultDesc[0]._;

	context.response = { resultCode, resultDescription };

	// ! Not successful
	if (resultCode !== SUCCESS_CODE) {
		logger.error('Account adjustment failed', { context });
		throw new HttpError(resultDescription, 400);
	}

	logger.info('Main Product Changed successfully', { context });
	return {
		status: true,
		message: resultDescription,
	};
};

export default subscribeProductApi;
