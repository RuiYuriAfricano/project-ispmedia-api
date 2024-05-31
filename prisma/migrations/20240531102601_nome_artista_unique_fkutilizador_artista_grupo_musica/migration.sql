/*
  Warnings:

  - You are about to drop the column `dataDeCriacao` on the `artista` table. All the data in the column will be lost.
  - You are about to drop the column `historia` on the `artista` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nomeArtista]` on the table `artista` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fkUtilizador` to the `artista` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generoMusical` to the `artista` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkUtilizador` to the `grupoMusical` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `artista` DROP COLUMN `dataDeCriacao`,
    DROP COLUMN `historia`,
    ADD COLUMN `fkUtilizador` INTEGER NOT NULL,
    ADD COLUMN `generoMusical` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `grupomusical` ADD COLUMN `fkUtilizador` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- CreateIndex
CREATE UNIQUE INDEX `artista_nomeArtista_key` ON `artista`(`nomeArtista`);

-- AddForeignKey
ALTER TABLE `grupoMusical` ADD CONSTRAINT `grupoMusical_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artista` ADD CONSTRAINT `artista_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;
