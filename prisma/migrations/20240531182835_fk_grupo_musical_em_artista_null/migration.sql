/*
  Warnings:

  - Made the column `fkUtilizador` on table `artista` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `artista` DROP FOREIGN KEY `artista_fkUtilizador_fkey`;

-- AlterTable
ALTER TABLE `artista` MODIFY `fkUtilizador` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- AddForeignKey
ALTER TABLE `artista` ADD CONSTRAINT `artista_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;
