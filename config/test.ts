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
			username: process.env.CBS_USERNAME,
			password: process.env.CBS_PASSWORD,
			firstActivation: {
				url: process.env.FIRST_ACTIVATION_URL,
			},
			subscribeProduct: {
				url: process.env.SUBSCRIBE_PRODUCT_URL,
			},
		},
	},
};

export default config;
