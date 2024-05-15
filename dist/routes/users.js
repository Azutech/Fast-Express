"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = require("express");
const users_1 = require("../controllers/users");
const authorizedToken_1 = require("../middlewares/authorizedToken");
exports.user = (0, express_1.Router)();
exports.user.get('/allusers', users_1.allUsers);
exports.user.get('/dashboard', authorizedToken_1.authenticateUser, users_1.dashoard);
