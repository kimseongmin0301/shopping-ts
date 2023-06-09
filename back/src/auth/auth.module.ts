import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core/constants';
import { AuthGuard } from './auth.guard';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: 24 * 60 * 60 },
        }),
    ],
    providers: [AuthService,
        LocalStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }