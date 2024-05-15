import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyJWT } from '../utils/jwt';
import { CustomRequest } from '../utils/types';

export const authenticateUser = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			throw new Error('Invalid Token');
		}

		const payload = verifyJWT(token);

		if (!payload) {
			throw new Error('Invalid JWT Payload');
		}
		req.user = payload.user;

		next();
	} catch (err: any) {
		console.error(err.message[0]);

		const statusMap: Record<string, number> = {
			'Unauthorized token': StatusCodes.UNAUTHORIZED,
			'Invalid Token': StatusCodes.FORBIDDEN,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};

