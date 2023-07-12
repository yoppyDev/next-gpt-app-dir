/*
  Warnings:

  - You are about to drop the column `room_is` on the `messages` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_room_is_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "room_is",
ADD COLUMN     "room_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
