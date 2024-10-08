/*
  Warnings:

  - Made the column `name` on table `Brand` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brandId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_brandId_fkey";

-- AlterTable
ALTER TABLE "Brand" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "brandId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
