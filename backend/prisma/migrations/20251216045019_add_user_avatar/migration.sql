-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_noteId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
