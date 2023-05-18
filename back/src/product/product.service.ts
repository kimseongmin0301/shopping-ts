import { Injectable, Req } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { ProductDto, createProductDto, getProductDto } from './dto/product.dto';

const prisma = new PrismaClient()

@Injectable()
export class ProductService {

    public createProduct = async (dto: ProductDto) => {

        const { userId, title, content, media, price, option } = dto;

        // try {
        const product = await prisma.product.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                title,
                content,
                media,
                price,
                option,
                regDt: new Date(),
                modDt: new Date(),
            },
        });
        await prisma.$disconnect();

        return product;
        // } catch (error) {
        //     throw new Error('Failed to create product.');
        // }
    };

    async getProducts(): Promise<Product[]> {
        try {
            const products = await prisma.product.findMany();

            return products;
        } catch (error) {
            throw new Error('Failed to get products');
        }
    }

    async getProductBySeq(seq: number): Promise<Product> {
        try {
            const product = await prisma.product.findUnique({
                where: {
                    seq: parseInt(seq.toString())
                }
            });
            return product;
        } catch (error) {
            throw new Error('Failed to get product');
        }
    }

    async deleteProductBySeq(seq: number): Promise<Product> {
        try {
            const product = await prisma.product.delete({
                where: {
                    seq: parseInt(seq.toString())
                }
            });
            return product;
        } catch (error) {
            throw new Error('Failed to delete product');
        }
    }

    async updateProductBySeq(seq: number, dto: ProductDto): Promise<Product> {

        const { title, content, media, price, option } = dto;

        try {
            const product = await prisma.product.update({
                where: {
                    seq: parseInt(seq.toString())
                },
                data: {
                    title,
                    content,
                    media,
                    price,
                    option,
                    modDt: new Date()
                }

            })

            return product;
        } catch (error) {
            throw new Error('Failed to update product');
        }
    }
}
