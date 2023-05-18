import { Body, Controller, Post, UseGuards, Request, Bind, Req, HttpCode, Get, Put } from '@nestjs/common';
import { CreateUserDto, CreateUserInfoDto, LoginDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @HttpCode(200)
    @Post('/join')
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.createUser(createUserDto);

        return { message: 'user create', user };

    }

    @Put('/updateAddress')
    async updateUser(@Body() dto: CreateUserInfoDto) {
        const user = await this.usersService.updateUser(dto);

        return user;
    }
}
