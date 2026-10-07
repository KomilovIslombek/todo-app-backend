import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.status(201).json({ success: true, message: 'working' });
});

export default router;
