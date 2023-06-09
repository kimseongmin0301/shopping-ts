import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/users.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(userId: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(userId, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}