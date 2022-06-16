import fs from 'fs';

const IN_POOL = '5';
const PREPAID = '0';

const batchAdjustAccount = async (data: any, file: any) => {
	const contentArray = fs.readFileSync(file.path, 'utf8').split('\n');
	return contentArray;
};

export default batchAdjustAccount;
