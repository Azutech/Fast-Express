import { IsEnum, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export enum PackageStatus {
	PENDING = 'pending',
	IN_TRANSIT = 'in_transit',
	OUT_FOR_DELIVERY = 'available_for_pickup',
	AVAILABLE_FOR_PICKUP = 'out_for_delivery',
	SUCCESS = 'success',
	CANCELLED = 'cancelled',
}

export class UpdatePackageDto {
	@IsNotEmpty()
	@IsString()
	packagename: string;

	@IsNotEmpty()
	@IsEnum(PackageStatus)
	status: PackageStatus;

	@IsNotEmpty()
	@IsDateString()
	pickUpDate: string;

	constructor(
		packagename: string,
		status: PackageStatus,
		pickUpDate: string,
	) {
		this.packagename = packagename;
		this.status = status;
		this.pickUpDate = pickUpDate;
	}
}
