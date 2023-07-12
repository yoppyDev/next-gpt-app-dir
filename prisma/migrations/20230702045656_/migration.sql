/*
  Warnings:

  - You are about to drop the column `room_id` on the `messages` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_room_id_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "room_id",
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
