import { Router } from 'express';
import { createUser, login } from '../controllers';

export const auth: Router = Router();

auth.post('/registration', createUser);
auth.post('/login', login);
