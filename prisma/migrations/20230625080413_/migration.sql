/*
  Warnings:

  - Made the column `role` on table `messages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `room_id` on table `messages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "room_id" SET NOT NULL;
