/*
  Warnings:

  - Added the required column `category` to the `quests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quests" ADD COLUMN     "category" TEXT NOT NULL;
