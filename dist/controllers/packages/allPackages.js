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
exports.allPackages = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const packageClient = new client_1.PrismaClient().package;
const allPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packages = yield packageClient.findMany({});
        if (!packages || packages.length === 0) {
            throw new Error('Error retrieving Packages');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            msg: 'Packages retrieved successfully',
            data: packages,
        });
    }
    catch (err) {
        console.error(err.message);
        const statusMap = {
            'Error retrieving Packages': http_status_codes_1.StatusCodes.BAD_REQUEST,
        };
        const statusCode = statusMap[err.message]
            ? statusMap[err.message]
            : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.allPackages = allPackages;
