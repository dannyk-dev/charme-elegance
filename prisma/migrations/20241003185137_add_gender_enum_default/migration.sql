/*
  Warnings:

  - The `gender` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('men', 'women');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'men',
ALTER COLUMN "size" DROP NOT NULL;
