import { Router } from 'express';

import handleLogin from '../controllers/auth/handleLogin.controller';
import handleLogout from '../controllers/auth/handleLogout.controller';
import handleRefreshToken from '../controllers/auth/handleRefreshToken.controller';
import validator from '../middlewares/validator.middleware';

import { loginSchema } from '../validations/login.schema';

const router = Router();

router.route('/login').post(validator(loginSchema), handleLogin);
router.route('/refresh').get(handleRefreshToken);
router.route('/logout').post(handleLogout);

export default router;
