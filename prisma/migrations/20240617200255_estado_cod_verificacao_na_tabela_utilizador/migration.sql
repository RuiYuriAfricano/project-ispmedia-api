-- AlterTable
ALTER TABLE `album` MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `musica` MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `utilizador` ADD COLUMN `codVerificacao` VARCHAR(191) NULL,
    ADD COLUMN `estado` VARCHAR(191) NOT NULL DEFAULT 'ativo',
    MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- AlterTable
ALTER TABLE `video` MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';
