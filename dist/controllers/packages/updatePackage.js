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
exports.updatePackage = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const packageClient = new client_1.PrismaClient().package;
const updatePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { packageId } = req.query;
        const { packagename, status, pickUpDate } = req.body;
        if (typeof packageId !== 'string') {
            throw new Error('Package ID must be a string');
        }
        const packageData = {
            packagename,
            status,
            pickUpDate,
        };
        const task = yield packageClient.update({
            where: {
                id: packageId,
            },
            data: packageData,
        });
        if (!task) {
            throw new Error('Error updating tasks');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            msg: 'Task updated successfully',
            data: task,
        });
    }
    catch (err) {
        const statusMap = {
            'Error updating tasks': http_status_codes_1.StatusCodes.BAD_GATEWAY,
            'Task ID must be a string': http_status_codes_1.StatusCodes.BAD_GATEWAY,
        };
        const statusCode = statusMap[err.message]
            ? statusMap[err.message]
            : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.updatePackage = updatePackage;
