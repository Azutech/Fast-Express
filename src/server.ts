import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from 'dotenv';
import { routes } from './routes';
config();

import { PORT } from './utils/config';

const server: Application = express();

server.use(express.json());
// server.use(helmet());
server.use('/api/v1', routes);
server.use(express.urlencoded({ extended: true }));

server.get('/', (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({ msg: 'Welcome To Fast-Express 🚀🚀' });
});

server.get('*', (req: Request, res: Response) => {
	res.status(StatusCodes.NOT_FOUND).json({ message: 'route not found 🔎' });
});

server.listen(PORT, () => {
	console.log(`Fast-Express is listening at http://localhost:${PORT} 🚀🚀`);
});

export default { server };
