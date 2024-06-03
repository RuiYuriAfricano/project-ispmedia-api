-- AlterTable
ALTER TABLE `musica` MODIFY `letra` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- AlterTable
ALTER TABLE `video` MODIFY `legenda` TEXT NOT NULL;
