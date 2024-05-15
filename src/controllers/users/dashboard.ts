import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomRequest } from '../../utils/types';

const userClient = new PrismaClient().user;

// getAllAuthors
export const dashoard = async (req: CustomRequest, res: Response) => {
	try {
		const { user } = req.query;

		console.log(user)

		if (typeof user !== 'string') {
			throw new Error('user ID must be a string');
		}


		const findUser = await userClient.findUnique({
			where: {
				id: user
			},
		});

		if (!findUser) {
			throw new Error('Error retreiving task');
		}

		res.status(StatusCodes.OK).json({
			msg: 'Dashoard viewed',
			data: findUser,
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
