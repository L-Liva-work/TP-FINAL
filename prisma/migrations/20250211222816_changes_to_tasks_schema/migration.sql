/*
  Warnings:

  - You are about to drop the column `final` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `inicio` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `proyectos` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `priority` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_proyectos_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "final",
DROP COLUMN "inicio",
DROP COLUMN "proyectos",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "endDate" DATE NOT NULL DEFAULT CURRENT_DATE + interval '1 month',
ADD COLUMN     "priority" TEXT NOT NULL,
ADD COLUMN     "startDate" DATE NOT NULL DEFAULT CURRENT_DATE;
