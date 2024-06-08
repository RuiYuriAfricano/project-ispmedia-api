/*
  Warnings:

  - You are about to drop the `ownersdosgrupos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedidodeadicaonosgrupos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `estado` to the `membrosDosGrupos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOwner` to the `membrosDosGrupos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ownersdosgrupos` DROP FOREIGN KEY `ownersDosGrupos_fkGrupoDeAmigos_fkey`;

-- DropForeignKey
ALTER TABLE `ownersdosgrupos` DROP FOREIGN KEY `ownersDosGrupos_fkUtilizador_fkey`;

-- DropForeignKey
ALTER TABLE `pedidodeadicaonosgrupos` DROP FOREIGN KEY `PedidoDeAdicaoNosGrupos_fkGrupoDeAmigos_fkey`;

-- DropForeignKey
ALTER TABLE `pedidodeadicaonosgrupos` DROP FOREIGN KEY `PedidoDeAdicaoNosGrupos_fkUtilizador_fkey`;

-- AlterTable
ALTER TABLE `membrosdosgrupos` ADD COLUMN `estado` INTEGER NOT NULL,
    ADD COLUMN `isOwner` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- DropTable
DROP TABLE `ownersdosgrupos`;

-- DropTable
DROP TABLE `pedidodeadicaonosgrupos`;
