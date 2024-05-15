import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class PackageDto {
	@IsNotEmpty()
	@IsString()
	packagename: string;

	@IsNotEmpty()
	@IsDate()
	pickUpDate: Date;

	constructor(packagename: string, pickUpDate: string) {
		this.packagename = packagename;
		this.pickUpDate = new Date(pickUpDate);
	}
}
