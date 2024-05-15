"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pack = void 0;
const express_1 = require("express");
const packages_1 = require("../controllers/packages");
const authorizedToken_1 = require("../middlewares/authorizedToken");
exports.pack = (0, express_1.Router)();
exports.pack.post('/createPack', authorizedToken_1.authenticateUser, packages_1.createPackage);
exports.pack.get('/allPackages', authorizedToken_1.authenticateUser, packages_1.allPackages);
exports.pack.get('/allPackagesByUser', authorizedToken_1.authenticateUser, packages_1.allPackagesByUser);
exports.pack.put('/updatePackage', authorizedToken_1.authenticateUser, packages_1.updatePackage);
exports.pack.delete('/removePackage', authorizedToken_1.authenticateUser, packages_1.deletePackage);