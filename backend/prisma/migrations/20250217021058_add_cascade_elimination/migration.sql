-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_creadorId_fkey";

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "endDate" SET DEFAULT CURRENT_DATE + interval '1 month';

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_creadorId_fkey" FOREIGN KEY ("creadorId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
