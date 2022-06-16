import config from 'config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import errorHandler from './middlewares/errorHandler.middleware';
import logger from './utils/loggers/logger';
import batchRoutes from './routes/batch.route';
import handleRequestID from './middlewares/handleRequestID.middleware';

const app = express();

const port: string = config.get('port');
const env: string = config.get('env');

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use('/public', express.static('public'));
app.use(express.json());
app.use(handleRequestID);
app.use('/api/batch', batchRoutes);
app.use(errorHandler);

//starting server
try {
	app.listen(port, async () => {
		const message = `Server is running on localhost:${port} in ${env} mode`;
		logger.info(message);
	});
} catch (error: any) {
	console.log(error);
	logger.error(error.message);
}