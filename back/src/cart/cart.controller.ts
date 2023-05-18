import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    // 장바구니목록 불러오기
    @Get('/:id')
    async getCartList(@Param('id') id: string) {
        return this.cartService.findAll(id);
    }

    // 장바구니 추가
    // 로그인 false일땐 사용 X
    @Post('/add')
    async addCart(dto: CartDto) {
        return this.cartService.addCart(dto);
    }

    // 장바구니 목록 수정( 옵션, 수량 같은 것 )
    @Put('/update')
    async updateCartList(dto: CartDto) {
        return this.cartService.updateCart(dto);
    }

    // 장바구니 목록 삭제
    @Delete('/delect')
    async deleteCartList(dto: CartDto[]) {
        return this.cartService.delectCart(dto);
    }
}
