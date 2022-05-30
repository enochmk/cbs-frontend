import axios from 'axios';
import config from 'config';
import xml2js from 'xml2js';

import { IContext } from '../interfaces/ILogger.interface';
import HttpError from '../utils/errors/HttpError';
import logger from '../utils/loggers/logger';

const URL: string = config.get('api.cbs.url.unsubscribeProduct');
const USERNAME: string = config.get('api.cbs.username');
const PASSWORD: string = config.get('api.cbs.password');
const SUCCESS_CODE: string = '405000000';

const context: IContext = {
	user: 'CBS',
};

const unsubscribeProductApi = async (
	requestID: string,
	msisdn: string,
	productID: string,
	remark: string
) => {
	context.label = 'cbsUnSubscribeAppendantProductApi';
	context.requestID = requestID;
	context.request = { msisdn, productID };

	const soapHeader = {
		headers: {
			'Content-Type': 'text/xml',
			SoapAction: 'UnSubscribeAppendantProduct',
		},
	};

	const soapRequest = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bus="http://www.huawei.com/bme/cbsinterface/cbs/businessmgrmsg" xmlns:com="http://www.huawei.com/bme/cbsinterface/common" xmlns:bus1="http://www.huawei.com/bme/cbsinterface/cbs/businessmgr">
      <soapenv:Header/>
      <soapenv:Body>
          <bus:UnSubscribeAppendantProductRequestMsg>
            <RequestHeader>
                <com:CommandId>UnSubscribeAppendantProduct</com:CommandId>
                <com:Version>1</com:Version>
                <com:TransactionId></com:TransactionId>
                <com:SequenceId>1</com:SequenceId>
                <com:RequestType>Event</com:RequestType>
                <com:SessionEntity>
                  <com:Name>${USERNAME}</com:Name>
                  <com:Password>${PASSWORD}</com:Password>
                  <com:RemoteAddress>10.81.1.124</com:RemoteAddress>
                </com:SessionEntity>
                <com:SerialNo>${requestID}</com:SerialNo>
                <com:Remark>${remark}</com:Remark>
            </RequestHeader>
            <UnSubscribeAppendantProductRequest>
                <bus1:SubscriberNo>${msisdn}</bus1:SubscriberNo>
                <bus1:Product>
                  <bus1:ProductID>${productID}</bus1:ProductID>
                  <bus1:ValidMode>4050000</bus1:ValidMode>
                </bus1:Product>
            </UnSubscribeAppendantProductRequest>
          </bus:UnSubscribeAppendantProductRequestMsg>
      </soapenv:Body>
    </soapenv:Envelope>
   `;

	const soapResponse = await axios.post(URL, soapRequest, soapHeader);
	const jsonResponse = await xml2js.parseStringPromise(soapResponse.data);
	const responseData = jsonResponse['soapenv:Envelope']['soapenv:Body'][0];
	const responseHeader = responseData.UnSubscribeAppendantProductResultMsg[0].ResultHeader[0];

	const resultCode = responseHeader.ResultCode[0]._;
	const resultDesc = responseHeader.ResultDesc[0]._;

	context.response = { resultCode, resultDesc };

	// ! Not successful
	if (resultCode !== SUCCESS_CODE) {
		logger.error('Product subscription failed', { context });
		throw new HttpError(resultDesc, 400);
	}

	logger.info('Succesful Product Subscription', { context });
	return {
		status: true,
		message: 'success',
	};
};

export default unsubscribeProductApi;
