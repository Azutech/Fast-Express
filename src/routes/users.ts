import { Router } from 'express';
import { allUsers, dashoard } from '../controllers/users';
import { authenticateUser } from '../middlewares/authorizedToken';

export const user: Router = Router();

user.get('/allusers', allUsers);
user.get('/dashboard', authenticateUser, dashoard);
