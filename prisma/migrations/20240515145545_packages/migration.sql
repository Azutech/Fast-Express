-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PackageStatus" ADD VALUE 'in_transit';
ALTER TYPE "PackageStatus" ADD VALUE 'out_for_delivery';
ALTER TYPE "PackageStatus" ADD VALUE 'available_for_pickup';
