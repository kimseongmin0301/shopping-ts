import { File } from "buffer";

export class createProductDto {
    seq: number;
    userId: string;
    title: string
    content: string
    media?: string | null
    price: number
    option?: string | null
    regDt: Date
    modDt: Date
}

export class getProductDto {
    title: string
    content: string
    media?: string | null
    price: number
    option?: string | null
}

export class ProductDto {
    seq: number;
    userId: string;
    title: string;
    content: string;
    media: string;
    price: string;
    option: string;
    regDt: Date;
    modDt: Date;
}