/*
  Warnings:

  - A unique constraint covering the columns `[nomeGrupoMusical]` on the table `grupoMusical` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- CreateIndex
CREATE UNIQUE INDEX `grupoMusical_nomeGrupoMusical_key` ON `grupoMusical`(`nomeGrupoMusical`);
