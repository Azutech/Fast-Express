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
exports.createPackage = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const class_validator_1 = require("class-validator");
const packageDto_1 = require("../../dtos/packageDto");
const packageClient = new client_1.PrismaClient().package;
const userClient = new client_1.PrismaClient().user;
const createPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { packagename, status, pickUpDate } = req.body;
        const { userId } = req.query;
        const userDto = new packageDto_1.PackageDto(packagename, status, pickUpDate); // Pass constructor arguments
        const errors = yield (0, class_validator_1.validate)(userDto);
        if (errors.length > 0) {
            const errorMessage = errors
                .map((error) => { var _a; return Object.values((_a = error.constraints) !== null && _a !== void 0 ? _a : {}); })
                .join(', ');
            throw new Error(errorMessage);
        }
        if (typeof userId !== 'string') {
            throw new Error('User ID must be a string');
        }
        const user = yield userClient.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new Error(`User doesn't exist`);
        }
        const createdPackage = yield packageClient.create({
            data: {
                packagename,
                status,
                pickUpDate: new Date(pickUpDate), // Assuming pickUpDate is in a compatible format
                userId,
            },
        });
        if (!createdPackage) {
            throw new Error('Unable to create Package');
        }
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            msg: ' Package created successfully',
            data: createdPackage,
        });
    }
    catch (err) {
        console.error(err);
        const statusMap = {
            'Unable to create user': http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            'User ID must be a string': http_status_codes_1.StatusCodes.BAD_REQUEST,
            'Unable to create Package': http_status_codes_1.StatusCodes.BAD_REQUEST,
        };
        const statusCode = statusMap[err.message] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.createPackage = createPackage;
