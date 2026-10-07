import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createUserSchema } from '../validations/user.validation.js';

const router = Router();

router.post('/', validate(createUserSchema), userController.registerUser);

router.get('/:id', (req, res) => {
  res.status(200).json({ message: `Placeholder: Fetching user ${req.params.id}` });
});

export default router;
