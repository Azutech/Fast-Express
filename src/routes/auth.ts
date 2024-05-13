import { Router } from 'express';
import { createUser } from '../controllers';

export const auth: Router = Router();

auth.post('/registration', createUser);
