/*
  Warnings:

  - The values [SYSTEM,USER,ASSISTANT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `role_id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the `assistants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `systems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('system', 'user', 'assostamt');
ALTER TABLE "messages" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "role_id",
ADD COLUMN     "room_id" INTEGER;

-- DropTable
DROP TABLE "assistants";

-- DropTable
DROP TABLE "systems";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);
