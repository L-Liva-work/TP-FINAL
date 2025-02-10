/*
  Warnings:

  - You are about to drop the column `proyectos` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `telefono` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proyectosId` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_proyectos_fkey";

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "telefono" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "proyectos",
ADD COLUMN     "proyectosId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_proyectosId_fkey" FOREIGN KEY ("proyectosId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
