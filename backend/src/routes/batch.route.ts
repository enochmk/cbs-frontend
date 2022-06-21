import { Router } from 'express';

import upload from '../middlewares/upload.middleware';
import validator from '../middlewares/validator.middleware';
import batchAdjustAccount from '../controllers/batch/batchAdjustAccount.controller';
import { batchRequestSchema } from '../validations/request.schema';

const router = Router();

router.route('/adjust-account').post(upload.single('file'), batchAdjustAccount);

export default router;
