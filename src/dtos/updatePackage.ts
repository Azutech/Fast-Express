import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class UpdatePackageDto {
	@IsNotEmpty()
	@IsString()
	packagename: string;

	@IsNotEmpty()
	@IsString()
	status: string;

	@IsNotEmpty()
	@IsDate()
	pickUpDate: Date;

	constructor(packagename: string, status: string, pickUpDate: string) {
		this.packagename = packagename;
        this.status = status
		this.pickUpDate = new Date(pickUpDate);
	}
}
