-- DropForeignKey
ALTER TABLE `video` DROP FOREIGN KEY `video_fkArtista_fkey`;

-- DropForeignKey
ALTER TABLE `video` DROP FOREIGN KEY `video_fkGrupoMusical_fkey`;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- AlterTable
ALTER TABLE `video` MODIFY `fkGrupoMusical` INTEGER NULL,
    MODIFY `fkArtista` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `video` ADD CONSTRAINT `video_fkGrupoMusical_fkey` FOREIGN KEY (`fkGrupoMusical`) REFERENCES `grupoMusical`(`codGrupoMusical`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `video` ADD CONSTRAINT `video_fkArtista_fkey` FOREIGN KEY (`fkArtista`) REFERENCES `artista`(`codArtista`) ON DELETE SET NULL ON UPDATE CASCADE;
