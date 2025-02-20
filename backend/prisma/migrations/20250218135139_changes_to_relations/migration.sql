/*
  Warnings:

  - You are about to drop the column `proyect_id` on the `UnlockTasks` table. All the data in the column will be lost.
  - You are about to drop the `Proyecto` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[project_id,task_id]` on the table `UnlockTasks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `project_id` to the `UnlockTasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Proyecto" DROP CONSTRAINT "Proyecto_creadorId_fkey";

-- DropForeignKey
ALTER TABLE "UnlockTasks" DROP CONSTRAINT "UnlockTasks_proyect_id_fkey";

-- DropIndex
DROP INDEX "UnlockTasks_proyect_id_task_id_key";

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "endDate" SET DEFAULT CURRENT_DATE + interval '1 month';

-- AlterTable
ALTER TABLE "UnlockTasks" DROP COLUMN "proyect_id",
ADD COLUMN     "project_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Proyecto";

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startdate" DATE NOT NULL DEFAULT CURRENT_DATE,
    "enddate" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relPersonProjects" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "relPersonProjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Projects_name_key" ON "Projects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UnlockTasks_project_id_task_id_key" ON "UnlockTasks"("project_id", "task_id");

-- AddForeignKey
ALTER TABLE "UnlockTasks" ADD CONSTRAINT "UnlockTasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relPersonProjects" ADD CONSTRAINT "relPersonProjects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relPersonProjects" ADD CONSTRAINT "relPersonProjects_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
