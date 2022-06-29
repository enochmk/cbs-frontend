import { Router } from 'express';

import validator from '../middlewares/validator.middleware';
import outputFile from '../controllers/download/outputFile.controller';
import { downloadFileSchema } from '../validations/download.schema';

const router = Router();

router.route('/').get(validator(downloadFileSchema), outputFile);

export default router;
