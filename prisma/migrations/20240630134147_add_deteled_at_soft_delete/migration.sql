-- AlterTable
ALTER TABLE `album` MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `musica` MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png',
    MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'ativo';

-- AlterTable
ALTER TABLE `video` MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';
