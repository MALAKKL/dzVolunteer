/*
  Warnings:

  - Made the column `userId` on table `Organization` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Volunteer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Volunteer" ALTER COLUMN "userId" SET NOT NULL;
