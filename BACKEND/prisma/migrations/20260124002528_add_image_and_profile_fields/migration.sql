-- AlterTable
ALTER TABLE "Mission" ADD COLUMN     "image" TEXT,
ALTER COLUMN "isPublished" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "competencies" TEXT[],
ADD COLUMN     "dateOfCreation" TIMESTAMP(3),
ADD COLUMN     "fieldOfActivity" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "logo" TEXT;

-- AlterTable
ALTER TABLE "Volunteer" ADD COLUMN     "photo" TEXT;
