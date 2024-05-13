import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const packageClient = new PrismaClient().package
const userClient = new PrismaClient().user


export const createPackage = async (req: Request, res: Response) => {

    const { packagename, status, pickUpDate, } = req.body;

    const { userId } = req.query;

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

}