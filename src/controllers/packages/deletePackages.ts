import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const packageClient = new PrismaClient().package;

export const deletePackage = async (req: Request, res: Response) => {
	try {
		const { packageId } = req.query;

		if (typeof packageId !== 'string') {
			throw new Error('Package ID must be a string');
		}

		const task = await packageClient.delete({
			where: {
				id: packageId,
			},
		});

		if (!task) {
			throw new Error('Error delete packages');
		}

		return res
			.status(StatusCodes.OK)
			.json({ msg: 'Package deleted successfully', data: task });
	} catch (err: any) {
		console.error(err.message);
		const statusMap: Record<string, number> = {
			'Error delete packages': StatusCodes.BAD_REQUEST,
		};

		const statusCode = statusMap[err.message]
			? statusMap[err.message]
			: StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
