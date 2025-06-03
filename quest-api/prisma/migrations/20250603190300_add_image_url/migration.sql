/*
  Warnings:

  - Added the required column `imageUrl` to the `quests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quests" ADD COLUMN "imageUrl" TEXT DEFAULT 'http://localhost:3000/images/quests/default.jpeg';
ALTER TABLE "quests" ALTER COLUMN "imageUrl" SET NOT NULL;
