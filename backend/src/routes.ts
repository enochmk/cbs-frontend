import { Router } from 'express';

import batch from './routes/batch.route';
import auth from './routes/auth.route';

const router = Router();

router.use('/batch', batch);
router.use('/auth', auth);

export default router;
