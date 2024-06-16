-- AlterTable
ALTER TABLE `album` ADD COLUMN `visibilidade` ENUM('Publico', 'Privado', 'PlaylistPrivado') NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';
