import { Router } from 'express';
import { allPackages, createPackage } from '../controllers/packages';
import { allPackagesByUser } from '../controllers/packages/allPackagesByUsers';

export const pack: Router = Router();

pack.post('/createPack', createPackage);
pack.get('/allPackages', allPackages);
pack.get('/allPackagesByUser', allPackagesByUser);
