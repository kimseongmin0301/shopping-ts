// auth.controller.ts

import { Body, Controller, Post, Get, Request, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.login(signInDto.id, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}


