import firstActivationApi from '../src/apis/firstActivation.api';

test('should activate first time subscriber', async () => {
	const msisdn: string = '579204783';
	const remark: string = 'Commercial Request';
	const requestID: string = Date.now().toString();

	const response = await firstActivationApi(requestID, msisdn, remark);
	expect(response).toBeDefined();
	expect(response).toBe(true);
});
