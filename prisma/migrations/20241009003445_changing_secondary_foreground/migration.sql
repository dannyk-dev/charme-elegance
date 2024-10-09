/*
  Warnings:

  - You are about to drop the column `secondary_color` on the `BrandSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BrandSettings" DROP COLUMN "secondary_color",
ADD COLUMN     "foreground_color" TEXT;
