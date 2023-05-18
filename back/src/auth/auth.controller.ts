// auth.controller.ts

import { Body, Controller, Post, Get, Request, HttpCode, HttpStatus, UseGuards, Res, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from './auth.guard';
import { UsersService } from "src/users/users.service";
import { Response, } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService
        , private readonly usersService: UsersService) { }

    @HttpCode(200) // 상태코드 전송
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>) {
        const token = await this.authService.login(signInDto.id, signInDto.password);
        return token;
    }

    @Post('/logout')
    logout(@Req() req: Request, @Res() res: Response): any {

    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.usersService.findOne(req.user.userId);
    }
}


