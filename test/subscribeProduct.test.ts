import subscribeProductApi from '../src/apis/subscribeProduct.api';

test('should subscribe product', async () => {
	const productID: string = '2018305889';
	const msisdn: string = '579204783';
	const remark: string = 'Commercial Request';
	const requestID: string = Date.now().toString();

	const result = await subscribeProductApi(requestID, msisdn, productID, remark);
	expect(result).toBeDefined();
	expect(result.status).toBe(true);
});
