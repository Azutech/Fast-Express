import { Router } from 'express';
import { auth } from './auth';

export const routes: Router = Router();

routes.use('/auth', auth);
