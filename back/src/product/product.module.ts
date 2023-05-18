import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: () => ({
                dest: './uploads'
            })
        }),
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule { }
