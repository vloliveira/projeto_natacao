/*
  Warnings:

  - You are about to alter the column `statusMatricula` on the `aluno` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - The values [ATRASADO] on the enum `Mensalidade_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `aluno` ADD COLUMN `dataAfastamento` DATETIME(3) NULL,
    MODIFY `statusMatricula` ENUM('ATIVO', 'AFASTADO') NOT NULL DEFAULT 'ATIVO';

-- AlterTable
ALTER TABLE `mensalidade` MODIFY `status` ENUM('PENDENTE', 'PAGO') NOT NULL DEFAULT 'PENDENTE';
