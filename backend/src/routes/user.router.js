import { Router } from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('user welcome');
});

router.get('/like', protectRoute, (req, res) => {
  req.auth.userId;
});

export default router;
