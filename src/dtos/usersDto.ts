import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
	Validate,
} from 'class-validator';
import { IsDomainConstraint } from '../utils/validation';

export class UserDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsEmail()
	@Validate(IsDomainConstraint, ['.com', '.co.uk', '.org', '.net']) // Specify the allowed domain(s)
	email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	password: string;

	constructor(name: string, email: string, password: string) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
