import { Injectable } from '@nestjs/common';
import { UserDto, CreateUserInfoDto } from './dto/users.dto';
import * as bcrypt from "bcrypt";
import { PrismaClient, User, UserInfo } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient()

@Injectable()
export class UsersService {
    constructor(private readonly jwtService: JwtService) { }

    // bcrypt 암호화
    async transformPassword(user: UserDto): Promise<string> {
        const saltOrRounds = 10; // 솔트 또는 해시 반복 횟수
        const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
        return hashedPassword;
    }

    // 회원가입
    public createUser = async (CreateUserDto: UserDto): Promise<User> => {

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
                        address1: userInfoCreateDto.address1 as string,
                        address2: userInfoCreateDto.address2 as string,
                        address3: userInfoCreateDto.address3 as string,
                        regDt: new Date(),
                        modDt: new Date(),
                    }
                }
            },
        })

        prisma.$disconnect();
        return result
    }

    // getProfile
    async findOne(id: string): Promise<any> {
        return prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                password: true, // 없으면 왜 에러가 나는가..
                name: true,
                UserInfo: {
                    select: {
                        address1: true,
                        address2: true,
                        address3: true,
                    }
                }
            }
        });
    }

    async updateUser(dto:  UserDto): Promise<User> {

        return prisma.user.update({
            where: {
                id: dto.id
            },
            data: {
                UserInfo: {
                    update: {
                        address1: dto.address1 as string,
                        address2: dto.address2 as string,
                        address3: dto.address3 as string
                    }
                }
            },
            include: {
                UserInfo: true
            }
        })
    }
}   
