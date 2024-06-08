/*
  Warnings:

  - Added the required column `dataDePartilha` to the `partilhaDeConteudo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `partilhadeconteudo` DROP FOREIGN KEY `partilhaDeConteudo_fkAlbum_fkey`;

-- DropForeignKey
ALTER TABLE `partilhadeconteudo` DROP FOREIGN KEY `partilhaDeConteudo_fkMusica_fkey`;

-- DropForeignKey
ALTER TABLE `partilhadeconteudo` DROP FOREIGN KEY `partilhaDeConteudo_fkVideo_fkey`;

-- AlterTable
ALTER TABLE `partilhadeconteudo` ADD COLUMN `dataDePartilha` DATETIME(3) NOT NULL,
    MODIFY `fkVideo` INTEGER NULL,
    MODIFY `fkMusica` INTEGER NULL,
    MODIFY `fkAlbum` INTEGER NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- AddForeignKey
ALTER TABLE `partilhaDeConteudo` ADD CONSTRAINT `partilhaDeConteudo_fkAlbum_fkey` FOREIGN KEY (`fkAlbum`) REFERENCES `album`(`codAlbum`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partilhaDeConteudo` ADD CONSTRAINT `partilhaDeConteudo_fkVideo_fkey` FOREIGN KEY (`fkVideo`) REFERENCES `video`(`codVideo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partilhaDeConteudo` ADD CONSTRAINT `partilhaDeConteudo_fkMusica_fkey` FOREIGN KEY (`fkMusica`) REFERENCES `musica`(`codMusica`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partilhaDeConteudo` ADD CONSTRAINT `partilhaDeConteudo_fkGrupoDeAmigos_fkey` FOREIGN KEY (`fkGrupoDeAmigos`) REFERENCES `grupoDeAmigos`(`codGrupoDeAmigos`) ON DELETE RESTRICT ON UPDATE CASCADE;
