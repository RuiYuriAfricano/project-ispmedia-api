-- AlterTable
ALTER TABLE `album` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `artista` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `conteudosdosgrupos` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `criticas` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `grupodeamigos` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `grupomusical` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `like` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `listadepartilha` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `membrosdalistadepartilhas` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `membrosdosgrupos` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `musica` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `musicasdaplaylist` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `notificacao` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `participacaomusica` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `participacaovideo` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `playlist` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `utilizador` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png',
    MODIFY `estado` VARCHAR(191) NOT NULL DEFAULT 'ativo';

-- AlterTable
ALTER TABLE `video` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `videosdaplaylist` ADD COLUMN `deletedAt` DATETIME(3) NULL;
