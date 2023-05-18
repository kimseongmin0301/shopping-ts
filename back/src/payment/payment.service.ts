import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { Payment, PrismaClient, User } from '@prisma/client';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

@Injectable()
export class PaymentService {

    async findAllPayment(id: string): Promise<Payment[]> {
        try {
            const findPayment = await prisma.payment.findMany({
                where: {
                    userId: id
                },
            });

            return findPayment;
        } catch (error) {
            throw new Error('Failed to find Payment');
        }
    }

    async createPayment(paymentDtos: PaymentDto[]): Promise<any> {
        // try {
        const result: Payment[] = [];
        const orderNum = (await prisma.payment.findMany()).length + 1;
        for (const paymentDto of paymentDtos) {
            const { userId, productPrice, title, amount, option } = paymentDto;

            const payment = await prisma.payment.create({
                data: {
                    user: {
                        connect: { id: userId }
                    },
                    productPrice,
                    amount,
                    title,
                    orderNumber: orderNum,
                    option,
                    regDt: new Date()
                }
            })
            result.push(payment);
        }

        await prisma.$disconnect();

        return result;

        // } catch (error) {
        //     throw new Error("Failed to create Payment")
        // }
    }

}
