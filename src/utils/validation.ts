import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDomain', async: false })
export class IsDomainConstraint implements ValidatorConstraintInterface {
	validate(email: string, args: ValidationArguments) {
		const domains = args.constraints as string[]; // Extract the array of allowed domains
		const emailParts = email.split('@');
		if (emailParts.length !== 2) {
			return false; // Invalid email format
		}
		const [, emailDomain] = emailParts;
		return domains.some((domain) => emailDomain.endsWith(domain)); // Check if email domain ends with any allowed domain
	}

	defaultMessage(args: ValidationArguments) {
		const domains = args.constraints as string[]; // Extract the array of allowed domains
		const allowedDomains = domains.join(', '); // Create a comma-separated list of allowed domains
		return `Email domain must be one of: ${allowedDomains}`;
	}
}

@ValidatorConstraint({ name: 'isValidPassword', async: false })
export class IsValidPasswordConstraint implements ValidatorConstraintInterface {
	validate(password: string, args: ValidationArguments) {
		// Define your regex pattern for password validation
		const regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
		return regexPattern.test(password);
	}

	defaultMessage(args: ValidationArguments) {
		return 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long.';
	}
}
