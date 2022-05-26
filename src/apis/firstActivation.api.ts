import axios from 'axios';
import config from 'config';
import xml2js from 'xml2js';

import { IContext } from '../interfaces/ILogger.interface';
import HttpError from '../utils/errors/HttpError';
import logger from '../utils/loggers/logger';

const URL: string = config.get('api.cbs.firstActivation.url');
const USERNAME: string = config.get('api.cbs.username');
const PASSWORD: string = config.get('api.cbs.password');
const SUCCESS_CODE: string = '405000000';

const context: IContext = {
	user: 'CBS',
};

const firstActivationApi = async (requestID: string, msisdn: string, remark: string) => {
	context.label = 'FirstActivationApi';
	context.requestID = requestID;
	context.request = { msisdn, remark };

	const soapHeader = {
		headers: {
			'Content-Type': 'text/xml',
			SoapAction: 'ActiveFirst',
		},
	};

	const soapRequest = `
     <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:acc="http://www.huawei.com/bme/cbsinterface/cbs/accountmgrmsg" xmlns:com="http://www.huawei.com/bme/cbsinterface/common" xmlns:acc1="http://www.huawei.com/bme/cbsinterface/cbs/accountmgr">
      <soapenv:Header/>
      <soapenv:Body>
          <acc:ActiveFirstRequestMsg>
            <RequestHeader>
                <com:CommandId>ActiveFirst</com:CommandId>
                <com:Version>1</com:Version>
                <com:TransactionId>Null</com:TransactionId>
                <com:SequenceId>1</com:SequenceId>
                <com:RequestType>Event</com:RequestType>
                <com:SessionEntity>
                  <com:Name>${USERNAME}</com:Name>
                  <com:Password>${PASSWORD}</com:Password>
                  <com:RemoteAddress/>
                </com:SessionEntity>
                <com:SerialNo>${requestID}</com:SerialNo>
            </RequestHeader>
            <ActiveFirstRequest>
                <acc1:SubscriberNo>${msisdn}</acc1:SubscriberNo>
            </ActiveFirstRequest>
          </acc:ActiveFirstRequestMsg>
      </soapenv:Body>
    </soapenv:Envelope>
   `;

	const soapResponse = await axios.post(URL, soapRequest, soapHeader);
	const jsonResponse = await xml2js.parseStringPromise(soapResponse.data);

	const responseData =
		jsonResponse['soapenv:Envelope']['soapenv:Body'][0]['ActiveFirstResultMsg'][0];
	const resultHeader = responseData['ResultHeader'][0];

	const resultCode = resultHeader['ResultCode'][0]._;

	const resultDesc = resultHeader['ResultDesc'][0]._;

	context.response = { resultCode, resultDesc };

	// ! Not successful
	if (resultCode !== SUCCESS_CODE) {
		logger.error('Activation Failed', { context });
		throw new HttpError(resultDesc, 400);
	}

	logger.info('Succesful Product Subscription', { context });
	return true;
};

export default firstActivationApi;
