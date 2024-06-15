/*
  Warnings:

  - You are about to drop the column `tipoDeGrupo` on the `grupodeamigos` table. All the data in the column will be lost.
  - Added the required column `dataDeCriacao` to the `grupoDeAmigos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `grupodeamigos` DROP COLUMN `tipoDeGrupo`,
    ADD COLUMN `dataDeCriacao` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';
