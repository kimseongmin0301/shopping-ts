/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `modDt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "auth" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "modDt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "regDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "address1" TEXT,
    "address2" TEXT,
    "address3" TEXT,
    "regDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modDt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "seq" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "media" TEXT,
    "price" INTEGER NOT NULL,
    "option" TEXT,
    "regDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modDt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("seq")
);

-- CreateTable
CREATE TABLE "Media" (
    "seq" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "media1" TEXT NOT NULL,
    "media2" TEXT NOT NULL,
    "media3" TEXT NOT NULL,
    "regDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("seq")
);

-- CreateTable
CREATE TABLE "Cart" (
    "seq" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "regDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("seq")
);

-- CreateTable
CREATE TABLE "Payment" (
    "seq" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "productPrice" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "option" TEXT,
    "regDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("seq")
);

-- CreateTable
CREATE TABLE "MediumsOnPayments" (
    "mediaId" INTEGER NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "regDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER,

    CONSTRAINT "MediumsOnPayments_pkey" PRIMARY KEY ("mediaId","paymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userId_key" ON "UserInfo"("userId");

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Product"("seq") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Product"("seq") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediumsOnPayments" ADD CONSTRAINT "MediumsOnPayments_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("seq") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediumsOnPayments" ADD CONSTRAINT "MediumsOnPayments_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("seq") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediumsOnPayments" ADD CONSTRAINT "MediumsOnPayments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("seq") ON DELETE SET NULL ON UPDATE CASCADE;
