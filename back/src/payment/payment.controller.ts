import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    // 결제목록 불러오기
    @Get('/:id')
    async getPayment(@Param('id') id: string) {
        return await this.paymentService.findAllPayment(id);
    }

    // 결제하기
    @Post()
    async createPayment(@Body() paymentDto: PaymentDto[]) {

        return this.paymentService.createPayment(paymentDto);
    }
}
