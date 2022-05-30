import axios from 'axios';
import config from 'config';
import xml2js from 'xml2js';

import { IContext } from '../interfaces/ILogger.interface';
import HttpError from '../utils/errors/HttpError';
import logger from '../utils/loggers/logger';

const URL: string = config.get('api.cbs.url.adjustAccount');
const USERNAME: string = config.get('api.cbs.username');
const PASSWORD: string = config.get('api.cbs.password');
const SUCCESS_CODE: string = '405000000';

const context: IContext = {
	user: 'CBS',
};

const subscribeProductApi = async (
	requestID: string,
	msisdn: string,
	accounType: string,
	remark: string
) => {
	context.label = 'adjustAccount';
	context.requestID = requestID;
	context.request = { msisdn, 'Adjust Account': accounType };

	const soapHeader = {
		headers: {
			'Content-Type': 'text/xml',
			SoapAction: 'AdjustAccount',
		},
	};

	const soapRequest = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:acc="http://www.huawei.com/bme/cbsinterface/cbs/accountmgrmsg" xmlns:com="http://www.huawei.com/bme/cbsinterface/common" xmlns:acc1="http://www.huawei.com/bme/cbsinterface/cbs/accountmgr">
    <soapenv:Header/>
    <soapenv:Body>
        <acc:AdjustAccountRequestMsg>
          <RequestHeader>
              <com:CommandId>AdjustAccount</com:CommandId>
              <com:Version>1</com:Version>
              <com:TransactionId>1</com:TransactionId>
              <com:SequenceId>1</com:SequenceId>
              <com:RequestType>Event</com:RequestType>
              <com:SessionEntity>
                <com:Name>${USERNAME}</com:Name>
                <com:Password>${PASSWORD}</com:Password> 
                <com:RemoteAddress></com:RemoteAddress>
              </com:SessionEntity>
              <com:SerialNo>${requestID}</com:SerialNo>
              <com:Remark>${remark}</com:Remark>
          </RequestHeader>
          <AdjustAccountRequest>
              <acc1:SubscriberNo>${msisdn}</acc1:SubscriberNo>
              <acc1:OperateType>3</acc1:OperateType>
              <acc1:ModifyAcctFeeList>
                <acc1:ModifyAcctFee>
                    <acc1:AccountType>${accounType}</acc1:AccountType>
                    <acc1:CurrAcctChgAmt>0</acc1:CurrAcctChgAmt>
                </acc1:ModifyAcctFee>
              </acc1:ModifyAcctFeeList>
          </AdjustAccountRequest>
        </acc:AdjustAccountRequestMsg>
    </soapenv:Body>
  </soapenv:Envelope>
   `;

	const soapResponse = await axios.post(URL, soapRequest, soapHeader);
	const jsonResponse = await xml2js.parseStringPromise(soapResponse.data);

	const responseData = jsonResponse['soapenv:Envelope']['soapenv:Body'][0];

	const adjustAccountMessage = responseData.AdjustAccountResultMsg[0].ResultHeader[0];
	const resultCode = adjustAccountMessage.ResultCode[0]._;
	const resultDescription = adjustAccountMessage.ResultDesc[0]._;

	context.response = { resultCode, resultDescription };

	// ! Not successful
	if (resultCode !== SUCCESS_CODE) {
		logger.error('Account adjustment failed', { context });
		throw new HttpError(resultDescription, 400);
	}

	logger.info('Account Adjusted successfully', { context });
	return {
		status: true,
		message: 'success',
	};
};

export default subscribeProductApi;
