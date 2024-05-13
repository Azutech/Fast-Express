import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validate, ValidationError } from 'class-validator';
import { UserDto } from '../dtos/usersDto';
import { hashPassword } from '../utils/hashpassword';

const userClient = new PrismaClient().user;

export const createUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body; // Destructure values from request body

		const userDto = new UserDto(name, email, password); // Pass constructor arguments

		const errors: ValidationError[] = await validate(userDto);
		if (errors.length > 0) {
			const errorMessage = errors
				.map((error) => Object.values(error.constraints ?? {}))
				.join(', ');
			throw new Error(errorMessage);
		}

		// Check if email already exists
		const existingUser = await userClient.findFirst({
			where: {
				email: userDto.email,
			},
		});

		if (existingUser) {
			throw new Error('Email already exists');
		}

		const hash = (await hashPassword(userDto.password)) as string;

		// Create new user
		const newUser = await userClient.create({
			data: {
				name: userDto.name,
				email: userDto.email,
				password: hash,
			},
		});

		if (!newUser) {
			throw new Error('Unable to create user');
		}

		res.status(StatusCodes.CREATED).json({
			msg: 'User created successfully',
			data: newUser,
		});
	} catch (err: any) {
		console.error(err);
		const statusMap: Record<string, number> = {
			'Unable to create user': StatusCodes.INTERNAL_SERVER_ERROR,
			'Email already exists': StatusCodes.BAD_REQUEST,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
