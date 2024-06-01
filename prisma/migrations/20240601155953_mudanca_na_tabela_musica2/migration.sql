-- DropForeignKey
ALTER TABLE `musica` DROP FOREIGN KEY `musica_fkAlbum_fkey`;

-- DropForeignKey
ALTER TABLE `musica` DROP FOREIGN KEY `musica_fkArtista_fkey`;

-- DropForeignKey
ALTER TABLE `musica` DROP FOREIGN KEY `musica_fkGrupoMusical_fkey`;

-- AlterTable
ALTER TABLE `musica` MODIFY `fkAlbum` INTEGER NULL,
    MODIFY `fkGrupoMusical` INTEGER NULL,
    MODIFY `fkArtista` INTEGER NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- AddForeignKey
ALTER TABLE `musica` ADD CONSTRAINT `musica_fkAlbum_fkey` FOREIGN KEY (`fkAlbum`) REFERENCES `album`(`codAlbum`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `musica` ADD CONSTRAINT `musica_fkGrupoMusical_fkey` FOREIGN KEY (`fkGrupoMusical`) REFERENCES `grupoMusical`(`codGrupoMusical`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `musica` ADD CONSTRAINT `musica_fkArtista_fkey` FOREIGN KEY (`fkArtista`) REFERENCES `artista`(`codArtista`) ON DELETE SET NULL ON UPDATE CASCADE;
