import { Router } from 'express';

import batch from './routes/batch.route';
import auth from './routes/auth.route';
import profile from './routes/profile.route';
import verifyJWT from './middlewares/verifyJWT';

const router = Router();

router.use('/batch', batch);
router.use('/auth', auth);
router.use('/profile', verifyJWT, profile);

export default router;