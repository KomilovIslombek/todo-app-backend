import { Router } from 'express';
import userRoutes from './user.routes.js';
import todoRoutes from './todo.routes.js';

const masterRouter = Router();

masterRouter.use('/users', userRoutes);
masterRouter.use('/todos', todoRoutes);

export default masterRouter;
