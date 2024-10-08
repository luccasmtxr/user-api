/*
  Warnings:

  - A unique constraint covering the columns `[celular]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `termos` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `termos` BOOLEAN NOT NULL,
    MODIFY `celular` INTEGER NULL,
    MODIFY `telefone` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_celular_key` ON `User`(`celular`);

-- CreateIndex
CREATE UNIQUE INDEX `User_telefone_key` ON `User`(`telefone`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
