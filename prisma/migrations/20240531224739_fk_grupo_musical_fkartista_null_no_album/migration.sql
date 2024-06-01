-- DropForeignKey
ALTER TABLE `album` DROP FOREIGN KEY `album_fkArtista_fkey`;

-- DropForeignKey
ALTER TABLE `album` DROP FOREIGN KEY `album_fkGrupoMusical_fkey`;

-- AlterTable
ALTER TABLE `album` MODIFY `fkArtista` INTEGER NULL,
    MODIFY `fkGrupoMusical` INTEGER NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- AddForeignKey
ALTER TABLE `album` ADD CONSTRAINT `album_fkArtista_fkey` FOREIGN KEY (`fkArtista`) REFERENCES `artista`(`codArtista`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `album` ADD CONSTRAINT `album_fkGrupoMusical_fkey` FOREIGN KEY (`fkGrupoMusical`) REFERENCES `grupoMusical`(`codGrupoMusical`) ON DELETE SET NULL ON UPDATE CASCADE;
