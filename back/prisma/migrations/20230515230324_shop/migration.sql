-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "MediumsOnPayments" DROP CONSTRAINT "MediumsOnPayments_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "MediumsOnPayments" DROP CONSTRAINT "MediumsOnPayments_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "MediumsOnPayments" DROP CONSTRAINT "MediumsOnPayments_productId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserInfo" DROP CONSTRAINT "UserInfo_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Product"("seq") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Product"("seq") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediumsOnPayments" ADD CONSTRAINT "MediumsOnPayments_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("seq") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediumsOnPayments" ADD CONSTRAINT "MediumsOnPayments_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("seq") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediumsOnPayments" ADD CONSTRAINT "MediumsOnPayments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("seq") ON DELETE CASCADE ON UPDATE CASCADE;
