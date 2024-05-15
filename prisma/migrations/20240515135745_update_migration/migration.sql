/*
  Warnings:

  - The `status` column on the `Package` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PackageStatus" AS ENUM ('pending', 'success', 'cancelled');

-- AlterTable
ALTER TABLE "Package" DROP COLUMN "status",
ADD COLUMN     "status" "PackageStatus" NOT NULL DEFAULT 'pending';
