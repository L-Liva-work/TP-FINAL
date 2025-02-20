-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_project_id_fkey";

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "endDate" SET DEFAULT CURRENT_DATE + interval '1 month';

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
