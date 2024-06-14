/*
  Warnings:

  - Added the required column `dataDeCriacao` to the `playlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `playlist` ADD COLUMN `dataDeCriacao` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `utilizador` MODIFY `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault.png';
