/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `utilizador` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `utilizador_username_key` ON `utilizador`(`username`);
