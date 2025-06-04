/*
  Warnings:

  - Added the required column `phone` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- Сначала добавляем поле с дефолтным значением
ALTER TABLE "orders" ADD COLUMN "phone" TEXT DEFAULT 'not_provided';

-- Обновляем существующие записи, если нужно
UPDATE "orders" SET "phone" = 'not_provided' WHERE "phone" IS NULL;

-- Делаем поле обязательным
ALTER TABLE "orders" ALTER COLUMN "phone" SET NOT NULL;
ALTER TABLE "orders" ALTER COLUMN "phone" DROP DEFAULT;
