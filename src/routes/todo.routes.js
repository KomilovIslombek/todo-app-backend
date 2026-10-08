import { Router } from 'express';
import * as todoController from '../controllers/todo.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createTodoSchema } from '../validations/todo.validation.js';

const router = Router();

router.post('/', validate(createTodoSchema), todoController.applyTodo);

router.get('/', todoController.getTodos).get('/:id', todoController.getOneTodo);

router.delete('/:id', todoController.deleteTodo);

router.patch('/:id', todoController.updateTodo);

export default router;
