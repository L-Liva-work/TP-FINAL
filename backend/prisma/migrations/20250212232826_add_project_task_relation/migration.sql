-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "endDate" SET DEFAULT CURRENT_DATE + interval '1 month';

-- CreateTable
CREATE TABLE "UnlockTasks" (
    "proyect_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UnlockTasks_proyect_id_task_id_key" ON "UnlockTasks"("proyect_id", "task_id");

-- AddForeignKey
ALTER TABLE "UnlockTasks" ADD CONSTRAINT "UnlockTasks_proyect_id_fkey" FOREIGN KEY ("proyect_id") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnlockTasks" ADD CONSTRAINT "UnlockTasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
