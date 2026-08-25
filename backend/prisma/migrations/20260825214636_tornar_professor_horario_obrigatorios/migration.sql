/*
  Warnings:

  - Made the column `professor` on table `aluno` required. This step will fail if there are existing NULL values in that column.
  - Made the column `horario` on table `aluno` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `aluno` MODIFY `professor` VARCHAR(191) NOT NULL,
    MODIFY `horario` VARCHAR(191) NOT NULL;
