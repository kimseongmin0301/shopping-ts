import { Body, Controller, Post, UseGuards, Request, Bind, Req, HttpCode, Get, Put } from '@nestjs/common';
import { UserDto, CreateUserInfoDto, LoginDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @HttpCode(200)
    @Post('/join')
    async createUser(@Body() dto: UserDto) {
        const user = await this.usersService.createUser(dto);

        return { message: 'user create', user };

    }

    @Put('/updateAddress')
    async updateUser(@Body() dto: UserDto) {
        const user = await this.usersService.updateUser(dto);

        return user;
    }
}
