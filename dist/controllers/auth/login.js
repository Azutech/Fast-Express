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
exports.login = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const class_validator_1 = require("class-validator");
const loginDto_1 = require("../../dtos/loginDto");
const hashpassword_1 = require("../../utils/hashpassword");
const jwt_1 = require("../../utils/jwt");
const userClient = new client_1.PrismaClient().user;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const loginDto = new loginDto_1.LoginDto(email, password); // Pass constructor arguments
        const errors = yield (0, class_validator_1.validate)(loginDto);
        if (errors.length > 0) {
            const errorMessage = errors
                .map((error) => { var _a; return Object.values((_a = error.constraints) !== null && _a !== void 0 ? _a : {}); })
                .join(', ');
            throw new Error(errorMessage);
        }
        const existingEmail = yield userClient.findFirst({
            where: {
                email: loginDto.email,
            },
        });
        if (!existingEmail) {
            throw new Error('User with email does not exist');
        }
        const passwordMatch = yield (0, hashpassword_1.comparePasswords)(password, existingEmail.password);
        if (!passwordMatch) {
            throw new Error('Wrong password');
        }
        const accessToken = (0, jwt_1.createJWT)({ existingEmail });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            msg: 'Login Successfully',
            token: accessToken,
        });
    }
    catch (err) {
        console.error(err.message);
        const statusMap = {
            'User with email does not exist': http_status_codes_1.StatusCodes.NOT_FOUND,
            'Wrong password.': http_status_codes_1.StatusCodes.BAD_REQUEST,
        };
        const statusCode = statusMap[err.message] || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.login = login;
