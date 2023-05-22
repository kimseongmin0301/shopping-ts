import { Injectable } from '@nestjs/common';
import { Cart, PrismaClient, Product } from '@prisma/client';
import { CartDto } from './dto/cart.dto';
import { get } from 'http';

const prisma = new PrismaClient();

@Injectable()
export class CartService {

    // 장바구니 찾기
    async findAll(id: string): Promise<any> {
        return prisma.cart.findMany({
            where: {
                userId: id
            },
            include: {
                product: true,
            }
        })
    }

    // 장바구니 추가
    async addCart(dto: CartDto): Promise<Cart> {

        const getCart = await prisma.cart.findMany({
            where: {
                userId: dto.userId,
                mediaId: dto.mediaId
            },
            select: {
                seq: true,
                count: true,
            }
        })
        if (getCart.length > 0) {
            const updateCart = await prisma.cart.update({
                where: {
                    seq: getCart[0]?.seq,
                },
                data: {
                    count: getCart[0]?.count + dto.count,
                    regDt: new Date(),
                }
            })

            return updateCart
        } else {
            const addCart = await prisma.cart.create({
                data: {
                    user: { connect: { id: dto.userId } },
                    product: { connect: { seq: dto.mediaId } },
                    count: dto.count,
                    regDt: new Date(),
                }
            })
            return addCart
        }
    }

    // 장바구니 수정(수량)
    async updateCart(dto: CartDto): Promise<Cart> {
        return await prisma.cart.update({
            where: {
                seq: dto.seq,
            },
            data: {
                count: dto.count,
                regDt: new Date(),
            }
        });
    }

    // 장바구니 삭제( 여러개 삭제 가능하게 Many )
    async deleteCart(dto: CartDto[]): Promise<void> {
        // try {
        const cartsIds = dto.map((d) => d.seq);

        await prisma.cart.deleteMany({
            where: {
                seq: {
                    in: cartsIds,
                }
            },
        });

        // } catch (error) {
        //     throw new Error('Failed to delect cart')
        // }
    }

}
