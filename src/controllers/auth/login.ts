import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validate, ValidationError } from 'class-validator';
import { LoginDto } from '../../dtos/loginDto';
import { comparePasswords } from '../../utils/hashpassword';
import { createJWT } from '../../utils/jwt';

const userClient = new PrismaClient().user;

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const loginDto = new LoginDto(email, password); // Pass constructor arguments

		const errors: ValidationError[] = await validate(loginDto);
		if (errors.length > 0) {
			const errorMessage = errors
				.map((error) => Object.values(error.constraints ?? {}))
				.join(', ');
			throw new Error(errorMessage);
		}

		const existingEmail = await userClient.findFirst({
			where: {
				email: loginDto.email,
			},
		});

		if (!existingEmail) {
			throw new Error('User with email does not exist');
		}

		const passwordMatch = await comparePasswords(
			password,
			existingEmail.password,
		);

		if (!passwordMatch) {
			throw new Error('Wrong password');
		}

		const accessToken = createJWT({ existingEmail });
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: true,
		});

		return res.status(StatusCodes.OK).json({
			msg: 'Login Successfully',
			token: accessToken,
		});
	} catch (err: any) {
		console.error(err.message);
		const statusMap: Record<string, number> = {
			'User with email does not exist': StatusCodes.NOT_FOUND,
			'Wrong password.': StatusCodes.BAD_REQUEST,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
