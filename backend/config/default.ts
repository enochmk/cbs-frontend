import dotenv from 'dotenv';

dotenv.config();

const config = {
	port: process.env.PORT || 5000,
	env: process.env.NODE_ENV || 'development',
	logger: {
		console: true,
		dirname: `${process.env.LOG_DIRECTORY}logs/%DATE%`,
		datePattern: 'YYYYMMDD',
	},
	tps: Number(process.env.TPS_LIMIT) || 50,
	api: {
		cbs: {
			username: process.env.CBS_USERNAME,
			password: process.env.CBS_PASSWORD,
			url: {
				firstActivation: process.env.FIRST_ACTIVATION_URL,
				subscribeProduct: process.env.SUBSCRIBE_PRODUCT_URL,
				adjustAccount: process.env.ADJUST_ACCOUNT_URL,
				unsubscribeProduct: process.env.UNSUBSCRIBE_PRODUCT_URL,
				changeMainProduct: process.env.CHANGE_MAIN_PRODUCT_URL,
			},
		},
	},
	upload: {
		destination: 'public/uploads',
		output: 'public/outputs',
	},
};

export default config;
