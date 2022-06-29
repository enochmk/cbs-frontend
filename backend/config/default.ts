import dotenv from 'dotenv';

dotenv.config();

const COOKIE_AGE = 1000 * 60 * 60 * 24;

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
	jwt: {
		accessExpiresIn: '30m',
		refreshExpiresIn: '1h',
		accessToken: process.env.ACCESS_TOKEN_SECRET,
		refreshToken: process.env.REFRESH_TOKEN_SECRET,
	},
	cookie: {
		age: COOKIE_AGE,
	},
	corsOptions: {
		credentials: true,
		origin: process.env.ORIGINS || [
			'http://localhost:3000',
			'http://10.81.9.68:9090',
		],
		optionSuccessStatus: 200,
	},
};

export default config;