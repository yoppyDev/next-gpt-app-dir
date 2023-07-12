/*
  Warnings:

  - The primary key for the `rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_room_id_fkey";

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "room_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "rooms_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "rooms_id_seq";

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
