/*
  Warnings:

  - You are about to alter the column `visibilidade` on the `album` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `album` MODIFY `visibilidade` VARCHAR(191) NOT NULL DEFAULT 'Publico';

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';
