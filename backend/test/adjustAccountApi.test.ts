import adjustAccount from '../src/api/cbs/adjustAccount.api';

test('should adjust account', async () => {
	const requestID = Date.now().toString();
	const msisdn = '576795786';
	const accountType = '5362';
	const remark = 'Compensation';

	const result = await adjustAccount({
		requestID,
		msisdn,
		accountType,
		remark,
	});

	expect(result).toBeDefined();
});
