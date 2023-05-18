import { Role } from "@prisma/client";

export class CreateUserDto {
    id: string;
    password: string & { hash: string };
    name: string;
    auth: Role;
    address1?: string;
    address2?: string;
    address3?: string;
}

export class CreateUserInfoDto {
    id: string;
    address1?: String
    address2?: string
    address3?: string
}

export class LoginDto {
    id: string;
    password: string & { hash: string };
}
