import unsubscribeProduct from '../src/apis/unsubscribeProduct.api';

test('should unsubscribe Product', async () => {
	const msisdn: string = '579204783';
	const remark: string = 'Commercial Request';
	const requestID: string = Date.now().toString();
  const productID: string = '2018305889';

	const response = await unsubscribeProduct(requestID, msisdn,productID, remark);
	expect(response).toBeDefined();
	expect(response.status).toBe(true);
});
