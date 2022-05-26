import HttpError from '../../utils/errors/HttpError';

export default (msisdn: string): string => {
	if (!msisdn) throw new HttpError('Invalid MSISDN ', 400);

	if (msisdn.length !== 9 && msisdn.length !== 10 && msisdn.length !== 12)
		throw new HttpError('Invalid format. Number should be 9 digits. ', 400);

	if (!msisdn.match(/^[0-9]+$/))
		throw new HttpError('Invalid MSISDN. MSISDN should be numeric. ', 400);

	// get last 9 digits
	const last9Digits = msisdn.substr(msisdn.length - 9);

	return last9Digits;
};
