-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "endDate" SET DEFAULT CURRENT_DATE + interval '1 month';
