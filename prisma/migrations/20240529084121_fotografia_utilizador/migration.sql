/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `utilizador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefone]` on the table `utilizador` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `utilizador` ADD COLUMN `fotografia` VARCHAR(191) NOT NULL DEFAULT 'userDefault';

-- CreateIndex
CREATE UNIQUE INDEX `utilizador_email_key` ON `utilizador`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `utilizador_telefone_key` ON `utilizador`(`telefone`);
