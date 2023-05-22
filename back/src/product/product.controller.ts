import { Body, Controller, Delete, Get, Post, Put, UploadedFiles, UploadedFile, UseInterceptors, Param, Res, Req } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { ProductDto, createProductDto } from './dto/product.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response, Request } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    // 이미지 + 상품 업로드
    @Post('write')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const filePath = file.fieldname + '-' + uniqueSuffix;
                    cb(null, filePath);
                },
            }),
        }),
    )
    async createProduct(
        @UploadedFile() file: Express.Multer.File | undefined | null, // 파일 매개변수를 선택적으로 받도록 수정
        @Req() req: Request,
    ) {
        if (file) {
            console.log(file.path);
        }
        // console.log(req.body);
        const filePath = file ? file.path : null;
        return this.productService.createProduct(req.body, filePath);
    }

    // 이미지 가져오기 (한 로직에 묶거나 다른방법을 고려해봐야함) 
    @Get('/image/:path')
    async getFile(@Param('path') path: string, @Res() res: Response) {
        try {
            const file = fs.readFileSync(`./uploads/${path}`);
            res.setHeader('Content-Type', 'image/jpeg'); 
            res.send(file); 
        } catch (error) {
            res.status(404).send('File not found');
        }
    }

    @Get('/list')
    async getProducts() {
        const products = await this.productService.getProducts();

        return products
    }

    // 상품 상세보기

    @Get('/list/:seq')
    async getProductById(@Param('seq') seq: number) {

        return await this.productService.getProductBySeq(seq);
    }

    // 상품 삭제
    @Delete('/list/:seq')
    async deleteProduct(@Param('seq') seq: number) {
        return await this.productService.deleteProductBySeq(seq);
    }

    // 상품 수정
    @Put('list/:seq')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    // 기존파일이름 사용
                    cb(null, file.originalname);
                },
            }),
        }),
    )
    async updateProduct(
        @Param('seq') seq: number,
        @UploadedFile() file: Express.Multer.File | undefined | null, // 파일 매개변수를 선택적으로 받도록 수정
        @Req() req: Request,) {
        return await this.productService.updateProductBySeq(seq, req.body);
    }
}
