/*
  Warnings:

  - You are about to drop the column `fkGrupoDeAmigos` on the `album` table. All the data in the column will be lost.
  - You are about to drop the column `fkGrupoDeAmigos` on the `musica` table. All the data in the column will be lost.
  - You are about to drop the column `fkGrupoDeAmigos` on the `video` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `album` DROP FOREIGN KEY `album_fkGrupoDeAmigos_fkey`;

-- DropForeignKey
ALTER TABLE `musica` DROP FOREIGN KEY `musica_fkGrupoDeAmigos_fkey`;

-- DropForeignKey
ALTER TABLE `video` DROP FOREIGN KEY `video_fkGrupoDeAmigos_fkey`;

-- AlterTable
ALTER TABLE `album` DROP COLUMN `fkGrupoDeAmigos`,
    ADD COLUMN `grupoDeAmigosCodGrupoDeAmigos` INTEGER NULL;

-- AlterTable
ALTER TABLE `musica` DROP COLUMN `fkGrupoDeAmigos`,
    ADD COLUMN `grupoDeAmigosCodGrupoDeAmigos` INTEGER NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- AlterTable
ALTER TABLE `video` DROP COLUMN `fkGrupoDeAmigos`,
    ADD COLUMN `grupoDeAmigosCodGrupoDeAmigos` INTEGER NULL;

-- CreateTable
CREATE TABLE `conteudosDosGrupos` (
    `codConteudo` INTEGER NOT NULL AUTO_INCREMENT,
    `fkGrupoDeAmigos` INTEGER NOT NULL,
    `fkAlbum` INTEGER NULL,
    `fkMusica` INTEGER NULL,
    `fkVideo` INTEGER NULL,

    PRIMARY KEY (`codConteudo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `album` ADD CONSTRAINT `album_grupoDeAmigosCodGrupoDeAmigos_fkey` FOREIGN KEY (`grupoDeAmigosCodGrupoDeAmigos`) REFERENCES `grupoDeAmigos`(`codGrupoDeAmigos`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `musica` ADD CONSTRAINT `musica_grupoDeAmigosCodGrupoDeAmigos_fkey` FOREIGN KEY (`grupoDeAmigosCodGrupoDeAmigos`) REFERENCES `grupoDeAmigos`(`codGrupoDeAmigos`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `video` ADD CONSTRAINT `video_grupoDeAmigosCodGrupoDeAmigos_fkey` FOREIGN KEY (`grupoDeAmigosCodGrupoDeAmigos`) REFERENCES `grupoDeAmigos`(`codGrupoDeAmigos`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudosDosGrupos` ADD CONSTRAINT `conteudosDosGrupos_fkAlbum_fkey` FOREIGN KEY (`fkAlbum`) REFERENCES `album`(`codAlbum`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudosDosGrupos` ADD CONSTRAINT `conteudosDosGrupos_fkMusica_fkey` FOREIGN KEY (`fkMusica`) REFERENCES `musica`(`codMusica`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudosDosGrupos` ADD CONSTRAINT `conteudosDosGrupos_fkVideo_fkey` FOREIGN KEY (`fkVideo`) REFERENCES `video`(`codVideo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conteudosDosGrupos` ADD CONSTRAINT `conteudosDosGrupos_fkGrupoDeAmigos_fkey` FOREIGN KEY (`fkGrupoDeAmigos`) REFERENCES `grupoDeAmigos`(`codGrupoDeAmigos`) ON DELETE RESTRICT ON UPDATE CASCADE;
