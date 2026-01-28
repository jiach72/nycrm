-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Untitled Project';
