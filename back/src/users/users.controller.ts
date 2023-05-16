import { Body, Controller, Post, UseGuards, Request, Bind, Req, HttpCode } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/users.dto';
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

    // @UseGuards(AuthGuard('local'))
    // @Post('/login')
    // async login(@Body() loginDto: LoginDto) {
    //     try {
    //         const user = await this.usersService.login(loginDto);
    //         return { success: true, user };
    //     } catch (error) {
    //         return { success: false, message: error.message };
    //     }
    // }

    // @UseGuards(AuthGuard('local'))
    // @Post('login')
    // async login(@Request() req) {
    //     return this.authService.login(req.user);
    // }
}
