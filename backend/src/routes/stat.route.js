import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('stat welcome');
});

export default router;
