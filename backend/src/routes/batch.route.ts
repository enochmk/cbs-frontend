import { Router } from 'express';

import upload from '../middlewares/upload.middleware';
import validator from '../middlewares/validator.middleware';
import adjustAccountController from '../controllers/batch/adjustAccount.controller';
import { batchRequestSchema } from '../validations/request.schema';

const router = Router();

router
	.route('/adjust-account')
	.post(upload.single('file'), adjustAccountController);

export default router;
