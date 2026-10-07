import { Router } from 'express';
import userRoutes from './user.routes.js';

const masterRouter = Router();

masterRouter.use('/users', userRoutes);

export default masterRouter;
