import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('song welcome');
});

export default router;
