import changeMainProduct from '../src/apis/changeMainProduct.api';

test('should activate first time subscriber', async () => {
	const msisdn: string = '579204783';
	const productID: string = '2018254719';
	const requestID: string = Date.now().toString();

	const response = await changeMainProduct(requestID, msisdn, productID);
	expect(response).toBeDefined();
	expect(response.status).toBe(true);
});
