import { Router } from 'express';
import { allPackages, createPackage, deletePackage, allPackagesByUser, updatePackage } from '../controllers/packages';

export const pack: Router = Router();

pack.post('/createPack', createPackage);
pack.get('/allPackages', allPackages);
pack.get('/allPackagesByUser', allPackagesByUser);
pack.put('/updatePackage', updatePackage)
pack.delete('/removePackage', deletePackage)