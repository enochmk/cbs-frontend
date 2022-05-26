import dotenv from 'dotenv';

dotenv.config();

const config = {
	port: process.env.PORT || 3000,
	env: process.env.NODE_ENV || 'development',
	logger: {
		console: true,
		path: '',
	},
	api: {
		cbs: {
			url: process.env.CBS_URL,
			username: process.env.CBS_USERNAME,
			password: process.env.CBS_PASSWORD,
		},
		mfs: {
			url: process.env.MFS_URL,
			username: process.env.MFS_USERNAME,
			password: process.env.MFS_PASSWORD,
			destinationMsisdn: process.env.MFS_DESTINATION_ACCOUNT,
			consumerID: process.env.MFS_CONSUMER_ID,
		},
	},
};

export default config;
