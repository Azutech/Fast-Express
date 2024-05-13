import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
	Validate,
} from 'class-validator';
import {
	IsDomainConstraint,
	IsValidPasswordConstraint,
} from '../utils/validation';

export class LoginDto {
	@IsNotEmpty()
	@IsEmail()
	@Validate(IsDomainConstraint, ['.com', '.co.uk', '.org', '.net']) // Specify the allowed domain(s)
	email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@Validate(IsValidPasswordConstraint)
	password: string;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}
