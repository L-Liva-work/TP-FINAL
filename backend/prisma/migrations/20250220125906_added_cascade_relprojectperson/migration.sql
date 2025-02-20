-- DropForeignKey
ALTER TABLE "relPersonProjects" DROP CONSTRAINT "relPersonProjects_person_id_fkey";

-- DropForeignKey
ALTER TABLE "relPersonProjects" DROP CONSTRAINT "relPersonProjects_project_id_fkey";

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "endDate" SET DEFAULT CURRENT_DATE + interval '1 month';

-- AddForeignKey
ALTER TABLE "relPersonProjects" ADD CONSTRAINT "relPersonProjects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relPersonProjects" ADD CONSTRAINT "relPersonProjects_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
