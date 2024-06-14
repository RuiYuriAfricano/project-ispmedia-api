/*
  Warnings:

  - You are about to drop the `partilhadeconteudo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `partilhadeconteudo` DROP FOREIGN KEY `partilhaDeConteudo_fkAlbum_fkey`;

-- DropForeignKey
ALTER TABLE `partilhadeconteudo` DROP FOREIGN KEY `partilhaDeConteudo_fkGrupoDeAmigos_fkey`;

-- DropForeignKey
ALTER TABLE `partilhadeconteudo` DROP FOREIGN KEY `partilhaDeConteudo_fkMusica_fkey`;

-- DropForeignKey
ALTER TABLE `partilhadeconteudo` DROP FOREIGN KEY `partilhaDeConteudo_fkUtilizador_fkey`;

-- DropForeignKey
ALTER TABLE `partilhadeconteudo` DROP FOREIGN KEY `partilhaDeConteudo_fkVideo_fkey`;

-- AlterTable
ALTER TABLE `album` ADD COLUMN `fkGrupoDeAmigos` INTEGER NULL;

-- AlterTable
ALTER TABLE `musica` ADD COLUMN `fkGrupoDeAmigos` INTEGER NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- AlterTable
ALTER TABLE `video` ADD COLUMN `fkGrupoDeAmigos` INTEGER NULL;

-- DropTable
DROP TABLE `partilhadeconteudo`;

-- AddForeignKey
ALTER TABLE `album` ADD CONSTRAINT `album_fkGrupoDeAmigos_fkey` FOREIGN KEY (`fkGrupoDeAmigos`) REFERENCES `grupoDeAmigos`(`codGrupoDeAmigos`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `musica` ADD CONSTRAINT `musica_fkGrupoDeAmigos_fkey` FOREIGN KEY (`fkGrupoDeAmigos`) REFERENCES `grupoDeAmigos`(`codGrupoDeAmigos`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `video` ADD CONSTRAINT `video_fkGrupoDeAmigos_fkey` FOREIGN KEY (`fkGrupoDeAmigos`) REFERENCES `grupoDeAmigos`(`codGrupoDeAmigos`) ON DELETE SET NULL ON UPDATE CASCADE;
