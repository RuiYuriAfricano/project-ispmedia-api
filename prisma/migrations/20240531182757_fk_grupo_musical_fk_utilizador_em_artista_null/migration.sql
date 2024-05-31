-- DropForeignKey
ALTER TABLE `artista` DROP FOREIGN KEY `artista_fkGrupoMusical_fkey`;

-- DropForeignKey
ALTER TABLE `artista` DROP FOREIGN KEY `artista_fkUtilizador_fkey`;

-- AlterTable
ALTER TABLE `artista` MODIFY `fkGrupoMusical` INTEGER NULL,
    MODIFY `fkUtilizador` INTEGER NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- AddForeignKey
ALTER TABLE `artista` ADD CONSTRAINT `artista_fkGrupoMusical_fkey` FOREIGN KEY (`fkGrupoMusical`) REFERENCES `grupoMusical`(`codGrupoMusical`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artista` ADD CONSTRAINT `artista_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE SET NULL ON UPDATE CASCADE;
