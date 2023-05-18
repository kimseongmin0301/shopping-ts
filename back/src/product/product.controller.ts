import { Body, Controller, Delete, Get, Post, Put, UploadedFiles, UploadedFile, UseInterceptors, Param, Res, Req } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { ProductDto, createProductDto } from './dto/product.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('/upload')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files);
        return files;
    }


    // form data로  게시글 + 파일 업로드
    @Post('test')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads', // 이미지 저장할 폴더 경로 설정
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const filePath = file.fieldname + '-' + uniqueSuffix; // 파일 경로 생성
                    cb(null, filePath);
                },
            }),
        }),
    )
    async createProduct(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
        console.log(file.path); // 파일 경로 출력
        console.log(req.body);
        // this.productService.createProduct(req.body);
        // 여기에서 파일 경로(file.path)를 데이터베이스에 저장하거나 필요한 처리를 수행합니다.

        return req.body;
    }

    @Post('tttt')
    test(@Body() createProduct: ProductDto) {

        return this.productService.createProduct(createProduct);
    }

    // 이미지 가져오기 (한 로직에 묶거나 다른방법을 고려해봐야함) 
    @Get('/image/:path')
    async getFile(@Param('path') path: string, @Res() res: Response) {
        try {
            const file = fs.readFileSync(`./upload/${path}`); // 파일 경로에 해당하는 파일을 읽습니다.
            res.setHeader('Content-Type', 'image/jpeg'); // 파일 타입에 맞게 Content-Type을 설정합니다.
            res.send(file); // 파일을 클라이언트에게 응답합니다.
        } catch (error) {
            // 파일을 찾지 못한 경우나 읽는 도중 에러가 발생한 경우 에러 처리 로직을 구현합니다.
            res.status(404).send('File not found');
        }
    }

    // @Post('test')
    // @UseInterceptors(FileInterceptor('file'))
    // async createProduct(@UploadedFile() file: Express.Multer.File, @Body() createProduct: createProductDto) {
    //     console.log('Original Name:', file.originalname);
    //     console.log('MIME Type:', file.mimetype);
    //     console.log('Size:', file.size);

    //     return { message: 'File uploaded successfully.' };
    // }


    // 상품 리스트 출력
    @Get('/list')
    async getProducts() {
        return await this.productService.getProducts();
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
    async updateProduct(@Param('seq') seq: number, @Body() dto: ProductDto) {
        return await this.productService.updateProductBySeq(seq, dto);
    }
}
