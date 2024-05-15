import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validate, ValidationError } from 'class-validator';
import { UpdatePackageDto } from '../../dtos/updatePackage';

const prisma = new PrismaClient();

export const updatePackage = async (req: Request, res: Response) => {
	try {
		const { packageId } = req.query;
		const { packagename, status, pickUpDate } = req.body;

		if (typeof packageId !== 'string') {
			throw new Error('Package ID must be a string');
		}

		const updatePackageDto = new UpdatePackageDto(packagename, status, pickUpDate);

		const errors: ValidationError[] = await validate(updatePackageDto);
		if (errors.length > 0) {
			const errorMessage = errors
				.map((error) => Object.values(error.constraints ?? {}))
				.join(', ');
			throw new Error(errorMessage);
		}

		const packageData = {
			packagename,
			status,
			pickUpDate: new Date(pickUpDate), // Convert pickUpDate to Date object
		};

		const task = await prisma.package.update({
			where: {
				id: packageId,
			},
			data: packageData,
		});

		if (!task) {
			throw new Error('Error updating package');
		}

		res.status(StatusCodes.OK).json({
			msg: 'Package updated successfully',
			data: task,
		});
	} catch (err: any) {
		const statusMap: Record<string, number> = {
			'Error updating package': StatusCodes.BAD_GATEWAY,
			'Package ID must be a string': StatusCodes.BAD_GATEWAY,
		};

		const statusCode = statusMap[err.message]
			? statusMap[err.message]
			: StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};

