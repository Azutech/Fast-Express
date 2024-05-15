import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const packageClient = new PrismaClient().package;

export const onePackage = async (req: Request, res: Response) => {
	try {
		const { packageId } = req.query;

		if (typeof packageId !== 'string') {
			throw new Error('Package ID must be a string');
		}

		const findPackage = await packageClient.findUnique({
			where: {
				id: packageId,
			},
		});

		if (!findPackage) {
			throw new Error('Error retreiving Package');
		}

		res.status(StatusCodes.OK).json({
			msg: 'Package task retreived successfully',
			data: findPackage,
		});
	} catch (err: any) {
		console.error(err.message);
		const statusMap: Record<string, number> = {
			'Error retrieving task': StatusCodes.BAD_REQUEST,
		};

		const statusCode = statusMap[err.message]
			? statusMap[err.message]
			: StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
