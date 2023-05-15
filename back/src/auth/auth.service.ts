import { Dependencies, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
@Dependencies(UsersService)
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async validateUser(userId: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(userId);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }


}
