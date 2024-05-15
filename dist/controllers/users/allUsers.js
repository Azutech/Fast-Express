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
exports.allUsers = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const userClient = new client_1.PrismaClient().user;
// getAllAuthors
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userClient.findMany({});
        if (!users || users.length === 0) {
            throw new Error('Error retrieving tasks');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            msg: 'Users retrieved successfully',
            data: users,
        });
    }
    catch (err) {
        console.error(err.message);
        const statusMap = {
            'Error retrieving tasks': http_status_codes_1.StatusCodes.BAD_REQUEST,
        };
        const statusCode = statusMap[err.message]
            ? statusMap[err.message]
            : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.allUsers = allUsers;
