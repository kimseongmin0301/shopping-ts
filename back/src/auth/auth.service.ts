// auth.service.ts

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/users/dto/users.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) { }

    async validateUser(userId: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(userId);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }


    // Login
    async login(id: string, password: string): Promise<any> {

        const existingUser = await this.usersService.findOne(id);

        if (!existingUser) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            throw new UnauthorizedException();
        }

        const payload = { userId: existingUser.id, sub: existingUser.password };

        // access_token: this.jwtService.sign(payload),

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}