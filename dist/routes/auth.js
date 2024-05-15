"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
exports.auth = (0, express_1.Router)();
exports.auth.post('/registration', auth_1.createUser);
exports.auth.post('/login', auth_1.login);
