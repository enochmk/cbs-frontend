import axios from 'axios';
import config from 'config';
import xml2js from 'xml2js';
import { AdjustAccountResponse } from '../../interfaces/IAdjustAccount.interface';

import { IContext } from '../../interfaces/ILogger.interface';
import HttpError from '../../utils/errors/HttpError';
import logger from '../../utils/loggers/logger';

const URL = config.get('api.cbs.url.adjustAccount') as string;
const USERNAME = config.get('api.cbs.username') as string;
const PASSWORD = config.get('api.cbs.password') as string;
const SUCCESS_CODE = '405000000';

export interface IAdjustAccountRequest {
	requestID: string;
	msisdn: string;
	accountType: string;
	remark: string;
	amount: number;
	agentID: string;
}

const adjustAccount = async (request: IAdjustAccountRequest) => {
	const { requestID, msisdn, accountType, remark, amount } = request;

	const context: IContext = {
		user: 'CBS',
		label: 'AdjustAccount',
		requestID: requestID,
		request: { msisdn, accountType, remark },
	};

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
											<acc1:AccountType>${accountType}</acc1:AccountType>
											<acc1:CurrAcctChgAmt>${amount}</acc1:CurrAcctChgAmt>
									</acc1:ModifyAcctFee>
								</acc1:ModifyAcctFeeList>
						</AdjustAccountRequest>
					</acc:AdjustAccountRequestMsg>
			</soapenv:Body>
		</soapenv:Envelope>
  `;

	const soapResponse = await axios.post(URL, soapRequest, soapHeader);
	const jsonResponse: AdjustAccountResponse = await xml2js.parseStringPromise(
		soapResponse.data
	);

	const responseData = jsonResponse['soapenv:Envelope']['soapenv:Body'][0];

	const adjustAccountMessage =
		responseData.AdjustAccountResultMsg[0].ResultHeader[0];
	const resultCode = adjustAccountMessage.ResultCode[0]._;
	const resultDesc = adjustAccountMessage.ResultDesc[0]._;
	context.response = { jsonResponse };

	// ! Not successful
	if (resultCode !== SUCCESS_CODE) {
		logger.warn(resultDesc, context);
		throw new HttpError(resultDesc, 400, context);
	}

	logger.info('success', context);

	return {
		resultCode,
		resultDesc,
	};
};

export default adjustAccount;
