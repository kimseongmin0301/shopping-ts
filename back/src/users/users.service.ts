import { Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserInfoDto, LoginDto } from './dto/users.dto';
import * as bcrypt from "bcrypt";
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient()



@Injectable()
export class UsersService {

    // bcrypt 암호화
    async transformPassword(user: CreateUserDto) {
        const pw = await bcrypt.hash(
            user.password, 10,
        );
        return pw;
    }

    // 회원가입
    public createUser = async (CreateUserDto: CreateUserDto): Promise<User> => {

        const { id, name, auth, address1, address2, address3 } = CreateUserDto;

        const userInfoCreateDto: CreateUserInfoDto = {
            id,
            address1,
            address2,
            address3,
        };

        const result = await prisma.user.create({
            data: {
                id,
                password: await this.transformPassword(CreateUserDto),
                name,
                auth,
                regDt: new Date(),
                modDt: new Date(),
                UserInfo: {
                    create: {
                        id,
                        address1: userInfoCreateDto.address1,
                        address2: userInfoCreateDto.address2,
                        address3: userInfoCreateDto.address3,
                        regDt: new Date(),
                        modDt: new Date(),
                    }
                }
            },
        })

        prisma.$disconnect();
        return result
    }

    async findOne(id: string): Promise<User | undefined> {
        return prisma.user.findUnique({ where: { id } });
    }

    // Login
    public login = async (user: LoginDto): Promise<User> => {

        const { id, password } = user;

        const existingUser = await prisma.user.findUnique({ where: { id } });

        if (!existingUser) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            throw new Error('Invalid password');
        }

        return existingUser;
    }
}   
