import config from 'config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import prisma from './database/AppDatabase';
import errorHandler from './middlewares/errorHandler.middleware';
import logger from './utils/loggers/logger';
import routes from './routes';
import handleRequestID from './middlewares/handleRequestID.middleware';

const app = express();

const port: string = config.get('port');
const env: string = config.get('env');
const corsOptions: any = config.get('corsOptions');

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use('/public', express.static('public'));
app.use(express.json());
app.use(handleRequestID);
app.use('/api/v1', routes);
app.use(errorHandler);

// start express server
app.listen(port, () => {
	const message = `Server is running in mode: ${env} at http://localhost:${port}`;
	logger.info(message);

	try {
		prisma.$connect();
		logger.info('Connected to database');
	} catch (error) {
		logger.error(error);
		process.exit(1);
	}
});
