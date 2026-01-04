/*
  Warnings:

  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `status` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Mission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Mission` table. All the data in the column will be lost.
  - You are about to drop the column `slots` on the `Mission` table. All the data in the column will be lost.
  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Organization` table. All the data in the column will be lost.
  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `verified` on the `Skill` table. All the data in the column will be lost.
  - The primary key for the `Volunteer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the `_MissionSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_VolunteerSkills` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[volunteerId,missionId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Volunteer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ORGANIZATION', 'VOLUNTEER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SkillVerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_missionId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_volunteerId_fkey";

-- DropForeignKey
ALTER TABLE "Mission" DROP CONSTRAINT "Mission_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "_MissionSkills" DROP CONSTRAINT "_MissionSkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_MissionSkills" DROP CONSTRAINT "_MissionSkills_B_fkey";

-- DropForeignKey
ALTER TABLE "_VolunteerSkills" DROP CONSTRAINT "_VolunteerSkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_VolunteerSkills" DROP CONSTRAINT "_VolunteerSkills_B_fkey";

-- DropIndex
DROP INDEX "Organization_email_key";

-- DropIndex
DROP INDEX "Volunteer_email_key";

-- AlterTable
ALTER TABLE "Application" DROP CONSTRAINT "Application_pkey",
ADD COLUMN     "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "volunteerId" SET DATA TYPE TEXT,
ALTER COLUMN "missionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Application_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Application_id_seq";

-- AlterTable
ALTER TABLE "Mission" DROP CONSTRAINT "Mission_pkey",
DROP COLUMN "date",
DROP COLUMN "slots",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sdgId" INTEGER,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "volunteersAccepted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "volunteersNeeded" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "organizationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Mission_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Mission_id_seq";

-- AlterTable
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_pkey",
DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "contact" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "history" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "mission" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Organization_id_seq";

-- AlterTable
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_pkey",
DROP COLUMN "verified",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "requiresVerification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Skill_id_seq";

-- AlterTable
ALTER TABLE "Volunteer" DROP CONSTRAINT "Volunteer_pkey",
DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "availabilities" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "interests" TEXT[],
ADD COLUMN     "totalHoursVolunteered" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Volunteer_id_seq";

-- DropTable
DROP TABLE "_MissionSkills";

-- DropTable
DROP TABLE "_VolunteerSkills";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "UserRole" NOT NULL,
    "googleId" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatarUrl" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunteerSkill" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "status" "SkillVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VolunteerSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SDG" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SDG_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissionSkill" (
    "id" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "levelRequired" TEXT,
    "mustBeVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MissionSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participation" (
    "id" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "hoursCompleted" INTEGER NOT NULL DEFAULT 0,
    "validatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validatedBy" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_googleId_idx" ON "User"("googleId");

-- CreateIndex
CREATE INDEX "VolunteerSkill_volunteerId_idx" ON "VolunteerSkill"("volunteerId");

-- CreateIndex
CREATE INDEX "VolunteerSkill_skillId_idx" ON "VolunteerSkill"("skillId");

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerSkill_volunteerId_skillId_key" ON "VolunteerSkill"("volunteerId", "skillId");

-- CreateIndex
CREATE INDEX "MissionSkill_missionId_idx" ON "MissionSkill"("missionId");

-- CreateIndex
CREATE INDEX "MissionSkill_skillId_idx" ON "MissionSkill"("skillId");

-- CreateIndex
CREATE UNIQUE INDEX "MissionSkill_missionId_skillId_key" ON "MissionSkill"("missionId", "skillId");

-- CreateIndex
CREATE INDEX "Participation_missionId_idx" ON "Participation"("missionId");

-- CreateIndex
CREATE INDEX "Participation_volunteerId_idx" ON "Participation"("volunteerId");

-- CreateIndex
CREATE UNIQUE INDEX "Participation_missionId_volunteerId_key" ON "Participation"("missionId", "volunteerId");

-- CreateIndex
CREATE INDEX "Application_volunteerId_idx" ON "Application"("volunteerId");

-- CreateIndex
CREATE INDEX "Application_missionId_idx" ON "Application"("missionId");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Application_volunteerId_missionId_key" ON "Application"("volunteerId", "missionId");

-- CreateIndex
CREATE INDEX "Mission_organizationId_idx" ON "Mission"("organizationId");

-- CreateIndex
CREATE INDEX "Mission_sdgId_idx" ON "Mission"("sdgId");

-- CreateIndex
CREATE INDEX "Mission_isPublished_idx" ON "Mission"("isPublished");

-- CreateIndex
CREATE INDEX "Mission_location_idx" ON "Mission"("location");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_userId_key" ON "Organization"("userId");

-- CreateIndex
CREATE INDEX "Organization_userId_idx" ON "Organization"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE INDEX "Skill_name_idx" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_userId_key" ON "Volunteer"("userId");

-- CreateIndex
CREATE INDEX "Volunteer_userId_idx" ON "Volunteer"("userId");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerSkill" ADD CONSTRAINT "VolunteerSkill_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerSkill" ADD CONSTRAINT "VolunteerSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerSkill" ADD CONSTRAINT "VolunteerSkill_verifiedBy_fkey" FOREIGN KEY ("verifiedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_sdgId_fkey" FOREIGN KEY ("sdgId") REFERENCES "SDG"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissionSkill" ADD CONSTRAINT "MissionSkill_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissionSkill" ADD CONSTRAINT "MissionSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
