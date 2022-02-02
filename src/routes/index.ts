import express from 'express';
import routerUser from './user.routes';
const router = express.Router();
router.use(routerUser)

export default router;
