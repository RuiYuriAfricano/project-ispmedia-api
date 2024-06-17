-- AlterTable
ALTER TABLE `album` MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `musica` ADD COLUMN `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- AlterTable
ALTER TABLE `video` ADD COLUMN `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';
