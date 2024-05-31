/*
  Warnings:

  - Added the required column `fkUtilizador` to the `album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkUtilizador` to the `musica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkUtilizador` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `album` ADD COLUMN `fkUtilizador` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `musica` ADD COLUMN `fkUtilizador` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';

-- AlterTable
ALTER TABLE `video` ADD COLUMN `fkUtilizador` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `album` ADD CONSTRAINT `album_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `musica` ADD CONSTRAINT `musica_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `video` ADD CONSTRAINT `video_fkUtilizador_fkey` FOREIGN KEY (`fkUtilizador`) REFERENCES `utilizador`(`codUtilizador`) ON DELETE RESTRICT ON UPDATE CASCADE;
