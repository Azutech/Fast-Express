"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../utils/jwt");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new Error('Invalid Token');
        }
        const payload = (0, jwt_1.verifyJWT)(token);
        if (!payload) {
            throw new Error('Invalid JWT Payload');
        }
        req.user = payload.user;
        next();
    }
    catch (err) {
        console.error(err.message[0]);
        const statusMap = {
            'Unauthorized token': http_status_codes_1.StatusCodes.UNAUTHORIZED,
            'Invalid Token': http_status_codes_1.StatusCodes.FORBIDDEN,
        };
        const statusCode = statusMap[err.message] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.authenticateUser = authenticateUser;
