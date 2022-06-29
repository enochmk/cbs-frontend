import { Router } from 'express';

import getDetails from '../controllers/profile/getDetails.controller';

const router = Router();

router.route('/').get(getDetails);

export default router;
