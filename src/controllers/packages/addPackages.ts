import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validate, ValidationError } from 'class-validator';
import { PackageDto } from '../../dtos/packageDto';

const packageClient = new PrismaClient().package;
const userClient = new PrismaClient().user;

export const createPackage = async (req: Request, res: Response) => {
	try {
		const { packagename, status, pickUpDate } = req.body;

		const { userId } = req.query;

		const userDto = new PackageDto(packagename, status, pickUpDate); // Pass constructor arguments

		const errors: ValidationError[] = await validate(userDto);
		if (errors.length > 0) {
			const errorMessage = errors
				.map((error) => Object.values(error.constraints ?? {}))
				.join(', ');
			throw new Error(errorMessage);
		}

		if (typeof userId !== 'string') {
			throw new Error('User ID must be a string');
		}

		const user = await userClient.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new Error(`User doesn't exist`);
		}

		const createdPackage = await packageClient.create({
			data: {
				packagename,
				status,
				pickUpDate: new Date(pickUpDate), // Assuming pickUpDate is in a compatible format
				userId,
			},
		});

		if (!createdPackage) {
			throw new Error('Unable to create Package');
		}

		res.status(StatusCodes.CREATED).json({
			msg: ' Package created successfully',
			data: createdPackage,
		});
	} catch (err: any) {
		console.error(err);
		const statusMap: Record<string, number> = {
			'Unable to create user': StatusCodes.INTERNAL_SERVER_ERROR,
			'User ID must be a string': StatusCodes.BAD_REQUEST,
			'Unable to create Package': StatusCodes.BAD_REQUEST,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
