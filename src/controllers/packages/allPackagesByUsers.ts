import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const packageClient = new PrismaClient().package;

export const allPackagesByUser = async (req: Request, res: Response) => {
	try {

        const { userId } = req.query;

		if (typeof userId !== 'string') {
			throw new Error('Task ID must be a string');
		}
		const packages = await packageClient.findMany({

            where : {
                userId : userId
            }
        });

		if (!packages || packages.length === 0) {
			throw new Error('Error retrieving Packages');
		}

		res.status(StatusCodes.OK).json({
			msg: 'Packages retrieved successfully',
			data: packages,
		});
	} catch (err: any) {
		console.error(err.message);
		const statusMap: Record<string, number> = {
			'Error retrieving Packages': StatusCodes.BAD_REQUEST,
		};

		const statusCode = statusMap[err.message]
			? statusMap[err.message]
			: StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
