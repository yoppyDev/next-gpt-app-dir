/*
  Warnings:

  - You are about to drop the column `roomId` on the `messages` table. All the data in the column will be lost.
  - Added the required column `room_is` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_roomId_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "roomId",
ADD COLUMN     "room_is" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_room_is_fkey" FOREIGN KEY ("room_is") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
