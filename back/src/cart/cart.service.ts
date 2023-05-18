import { Injectable } from '@nestjs/common';
import { Cart, PrismaClient, Product } from '@prisma/client';
import { CartDto } from './dto/cart.dto';

const prisma = new PrismaClient();

@Injectable()
export class CartService {

    // 장바구니 찾기
    async findAll(id: string): Promise<any> {
        return prisma.cart.findMany({
            where: {
                userId: id
            },
        })
    }

    // 장바구니 추가
    async addCart(dto: CartDto): Promise<Cart> {
        return prisma.cart.create({
            data: {
                user: { connect: { id: dto.userId } },
                product: { connect: { seq: dto.mediaId } },
                count: dto.count,
                regDt: new Date(),
            }
        })
    }

    // product에서 option 찾기
    async findOption(id: number): Promise<any> {
        return prisma.product.findUnique({
            where: {
                seq: id,
            },
            select: {
                option: true,
            },
        });
    }

    // 장바구니 수정(수량, 옵션)
    async updateCart(dto: CartDto): Promise<Cart> {
        try {
            const produOption: any = await this.findOption(dto.seq);

            if (!produOption) {
                throw new Error('Product not found.');
            }

            const updatedCart = await prisma.cart.update({
                where: {
                    seq: dto.seq,
                },
                data: {
                    count: dto.count,
                    product: {
                        update: {
                            option: produOption.option
                        }
                    },
                    regDt: new Date()
                },
                include: {
                    product: true,
                }
            });

            return updatedCart;
        } catch (error) {
            throw new Error('Failed to update cart.');
        }
    }

    // 장바구니 삭제( 여러개 삭제 가능하게 Many )
    async delectCart(dto: CartDto[]): Promise<void> {
        try {
            const cartsIds = dto.map((d) => d.seq);

            await prisma.cart.deleteMany({
                where: {
                    seq: {
                        in: cartsIds,
                    }
                },
            });

        } catch (error) {
            throw new Error('Failed to delect cart')
        }
    }

}
