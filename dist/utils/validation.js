"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidPasswordConstraint = exports.IsDomainConstraint = void 0;
const class_validator_1 = require("class-validator");
let IsDomainConstraint = class IsDomainConstraint {
    validate(email, args) {
        const domains = args.constraints; // Extract the array of allowed domains
        const emailParts = email.split('@');
        if (emailParts.length !== 2) {
            return false; // Invalid email format
        }
        const [, emailDomain] = emailParts;
        return domains.some((domain) => emailDomain.endsWith(domain)); // Check if email domain ends with any allowed domain
    }
    defaultMessage(args) {
        const domains = args.constraints; // Extract the array of allowed domains
        const allowedDomains = domains.join(', '); // Create a comma-separated list of allowed domains
        return `Email domain must be one of: ${allowedDomains}`;
    }
};
exports.IsDomainConstraint = IsDomainConstraint;
exports.IsDomainConstraint = IsDomainConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isDomain', async: false })
], IsDomainConstraint);
let IsValidPasswordConstraint = class IsValidPasswordConstraint {
    validate(password, args) {
        // Define your regex pattern for password validation
        const regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        return regexPattern.test(password);
    }
    defaultMessage(args) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long.';
    }
};
exports.IsValidPasswordConstraint = IsValidPasswordConstraint;
exports.IsValidPasswordConstraint = IsValidPasswordConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isValidPassword', async: false })
], IsValidPasswordConstraint);
