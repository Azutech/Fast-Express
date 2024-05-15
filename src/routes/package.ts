import { Router } from 'express';
import {
	allPackages,
	createPackage,
	deletePackage,
	allPackagesByUser,
	updatePackage,
	automatedUpdate,
	onePackage,
} from '../controllers/packages';
import { authenticateUser } from '../middlewares/authorizedToken';

export const pack: Router = Router();

pack.post('/createPack', authenticateUser, createPackage);
pack.get('/allPackages', authenticateUser, allPackages);
pack.get('/allPackagesByUser', authenticateUser, allPackagesByUser);
pack.put('/updatePackage', authenticateUser, updatePackage);
pack.get('/automatedUpdate', automatedUpdate);
pack.get('/getPackage', authenticateUser, onePackage);
pack.delete('/removePackage', authenticateUser, deletePackage);
