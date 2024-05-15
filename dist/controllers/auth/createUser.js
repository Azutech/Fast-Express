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
exports.createUser = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const class_validator_1 = require("class-validator");
const usersDto_1 = require("../../dtos/usersDto");
const hashpassword_1 = require("../../utils/hashpassword");
const userClient = new client_1.PrismaClient().user;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body; // Destructure values from request body
        const userDto = new usersDto_1.UserDto(name, email, password); // Pass constructor arguments
        const errors = yield (0, class_validator_1.validate)(userDto);
        if (errors.length > 0) {
            const errorMessage = errors
                .map((error) => { var _a; return Object.values((_a = error.constraints) !== null && _a !== void 0 ? _a : {}); })
                .join(', ');
            throw new Error(errorMessage);
        }
        // Check if email already exists
        const existingUser = yield userClient.findFirst({
            where: {
                email: userDto.email,
            },
        });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const hash = (yield (0, hashpassword_1.hashPassword)(userDto.password));
        // Create new user
        const newUser = yield userClient.create({
            data: {
                name: userDto.name,
                email: userDto.email,
                password: hash,
            },
        });
        if (!newUser) {
            throw new Error('Unable to create user');
        }
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            msg: 'User created successfully',
            data: newUser,
        });
    }
    catch (err) {
        console.error(err);
        const statusMap = {
            'Unable to create user': http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            'Email already exists': http_status_codes_1.StatusCodes.BAD_REQUEST,
        };
        const statusCode = statusMap[err.message] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.createUser = createUser;
