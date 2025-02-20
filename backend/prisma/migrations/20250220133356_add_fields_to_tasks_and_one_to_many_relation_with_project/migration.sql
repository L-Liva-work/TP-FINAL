/*
  Warnings:

  - You are about to drop the `UnlockTasks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `project_id` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UnlockTasks" DROP CONSTRAINT "UnlockTasks_project_id_fkey";

-- DropForeignKey
ALTER TABLE "UnlockTasks" DROP CONSTRAINT "UnlockTasks_task_id_fkey";

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "assigne" TEXT NOT NULL DEFAULT 'No Asignado',
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "project_id" INTEGER NOT NULL,
ALTER COLUMN "endDate" SET DEFAULT CURRENT_DATE + interval '1 month',
ALTER COLUMN "priority" SET DEFAULT 'NONE';

-- DropTable
DROP TABLE "UnlockTasks";

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
