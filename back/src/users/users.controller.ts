import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/join')
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.createUser(createUserDto);

        return { message: 'user create', user };

    }

    // @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        try {
            const user = await this.usersService.login(loginDto);
            return { success: true, user };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}
