/*
  Warnings:

  - Added the required column `orderNumber` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "orderNumber" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
