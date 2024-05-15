import { PrismaClient,  } from '@prisma/client'; // Import PackageStatus from PrismaClient
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import cron from 'node-cron';
import { PackageStatus } from '@prisma/client/'; // Import PackageStatus from PrismaClient runtime


const prisma = new PrismaClient();

export const automatedUpdate = async () => {
	try {
		const packages = await prisma.package.findMany({
			where: {
				status: {
					not: PackageStatus.available_for_pickup, // Use enum value from PrismaClient without quotes
				},
			},
		});

		for (const pkg of packages) {
			let newStatus: PackageStatus; // Use PackageStatus type for newStatus

			switch (pkg.status) {
				case PackageStatus.pending:
					newStatus = PackageStatus.in_transit; // Use enum values directly without quotes
					break;
				case PackageStatus.in_transit:
					newStatus = PackageStatus.out_for_delivery;
					break;
				case PackageStatus.out_for_delivery:
					newStatus = PackageStatus.available_for_pickup;
					break;
				default:
					newStatus = pkg.status; // pkg.status is already of type PackageStatus
					break;
			}

			await prisma.package.update({
				where: { id: pkg.id },
				data: { status: newStatus },
			});

			console.log(`Package ${pkg.id} status updated to ${newStatus}`);
		}
	} catch (error) {
		console.error('Error updating package statuses:', error);
	}
};

export const testAutomatedUpdate = async (req: Request, res: Response) => {
	try {
		await automatedUpdate(); // Call the reusable function
		res.status(StatusCodes.OK).json({
			message: 'Automated update completed',
		});
	} catch (error) {
		console.error('Error in testAutomatedUpdate:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: 'Internal Server Error',
		});
	}
};

// Schedule the automated update to run every 2 hours (e.g., at 0 minutes past every 2nd hour)
cron.schedule('*/2 * * * *', automatedUpdate);
