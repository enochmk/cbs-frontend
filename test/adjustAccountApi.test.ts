import adjustAccount from '../src/apis/adjustAccount.api';

test('should adjust account', async () => {
	const requestID: string = Date.now().toString();
	const msisdn: string = '579204783';
	const accounType: string = '5377';
	const remark: string = 'Compensation';

	const result = await adjustAccount(requestID, msisdn, accounType, remark);
	expect(result).toBeDefined();
	expect(result.status).toBe(true);
	expect(result.message).toBe('success');
});
