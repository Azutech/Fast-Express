import { Router } from 'express';
import { auth } from './auth';
import { user } from './users';


export const routes: Router = Router();

routes.use('/auth', auth);
routes.use('/user', user);
