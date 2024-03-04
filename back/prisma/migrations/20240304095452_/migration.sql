/*
  Warnings:

  - You are about to drop the column `name` on the `recipe` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredient` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `name`,
    ADD COLUMN `createdAt` VARCHAR(191) NOT NULL,
    ADD COLUMN `ingredient` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` VARCHAR(191) NOT NULL;
