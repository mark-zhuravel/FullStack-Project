/*
  Warnings:

  - Added the required column `phone` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN "phone" TEXT DEFAULT 'not_provided';

-- Make phone required after setting default value
ALTER TABLE "orders" ALTER COLUMN "phone" SET NOT NULL;
