"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const dotenv_1 = require("dotenv");
const routes_1 = require("./routes");
(0, dotenv_1.config)();
const config_1 = require("./utils/config");
const server = (0, express_1.default)();
server.use(express_1.default.json());
// server.use(helmet());
server.use('/api/v1', routes_1.routes);
server.use(express_1.default.urlencoded({ extended: true }));
server.get('/', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'Welcome To Fast-Express 🚀🚀' });
});
server.get('*', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'route not found 🔎' });
});
server.listen(config_1.PORT, () => {
    console.log(`Fast-Express is listening at http://localhost:${config_1.PORT} 🚀🚀`);
});
exports.default = { server };
