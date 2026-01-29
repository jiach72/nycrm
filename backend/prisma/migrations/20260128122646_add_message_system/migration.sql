/*
  Warnings:

  - You are about to drop the column `receiver_id` on the `messages` table. All the data in the column will be lost.
  - Added the required column `recipient_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('SYSTEM', 'PROJECT', 'DOCUMENT', 'PAYMENT', 'REMINDER', 'ANNOUNCEMENT');

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_receiver_id_fkey";

-- DropIndex
DROP INDEX "messages_created_at_idx";

-- DropIndex
DROP INDEX "messages_project_id_idx";

-- DropIndex
DROP INDEX "messages_receiver_id_idx";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "receiver_id",
ADD COLUMN     "recipient_id" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "MessageType" NOT NULL DEFAULT 'SYSTEM';

-- CreateIndex
CREATE INDEX "messages_recipient_id_is_read_idx" ON "messages"("recipient_id", "is_read");

-- CreateIndex
CREATE INDEX "messages_recipient_id_created_at_idx" ON "messages"("recipient_id", "created_at");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
