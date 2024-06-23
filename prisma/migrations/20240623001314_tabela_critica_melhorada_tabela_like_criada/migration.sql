/*
  Warnings:

  - Added the required column `dataDeRegisto` to the `criticas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `criticas` DROP FOREIGN KEY `criticas_fkAlbum_fkey`;

-- AlterTable
ALTER TABLE `album` MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `criticas` ADD COLUMN `dataDeRegisto` DATETIME(3) NOT NULL,
    ADD COLUMN `fkMusica` INTEGER NULL,
    ADD COLUMN `fkVideo` INTEGER NULL,
    MODIFY `fkAlbum` INTEGER NULL;

-- AlterTable
ALTER TABLE `musica` MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png',
    MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'ativo';

-- AlterTable
ALTER TABLE `video` MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- CreateTable
CREATE TABLE `like` (
    `codLike` INTEGER NOT NULL AUTO_INCREMENT,
    `fkAlbum` INTEGER NULL,
    `fkMusica` INTEGER NULL,
    `fkVideo` INTEGER NULL,
    `fkUtilizador` INTEGER NOT NULL,
    `dataDeRegisto` DATETIME(3) NOT NULL,

    PRIMARY KEY (`codLike`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `criticas` ADD CONSTRAINT `criticas_fkAlbum_fkey` FOREIGN KEY (`fkAlbum`) REFERENCES `album`(`codAlbum`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `criticas` ADD CONSTRAINT `criticas_fkMusica_fkey` FOREIGN KEY (`fkMusica`) REFERENCES `musica`(`codMusica`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `criticas` ADD CONSTRAINT `criticas_fkVideo_fkey` FOREIGN KEY (`fkVideo`) REFERENCES `video`(`codVideo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_fkAlbum_fkey` FOREIGN KEY (`fkAlbum`) REFERENCES `album`(`codAlbum`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_fkMusica_fkey` FOREIGN KEY (`fkMusica`) REFERENCES `musica`(`codMusica`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_fkVideo_fkey` FOREIGN KEY (`fkVideo`) REFERENCES `video`(`codVideo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;
