import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const userClient = new PrismaClient().user;

// getAllAuthors
export const allUsers = async (req: Request, res: Response) => {
	try {
		const users = await userClient.findMany({});

		if (!users || users.length === 0) {
			throw new Error('Error retrieving tasks');
		}

		res.status(StatusCodes.OK).json({
			msg: 'Users retrieved successfully',
			data: users,
		});
	} catch (err: any) {
		console.error(err.message);
		const statusMap: Record<string, number> = {
			'Error retrieving tasks': StatusCodes.BAD_REQUEST,
		};

		const statusCode = statusMap[err.message]
			? statusMap[err.message]
			: StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
