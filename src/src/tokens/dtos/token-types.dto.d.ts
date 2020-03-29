import { BaseEntityDto } from 'base/base-entity.dto';
export declare class TokenTypeDto extends BaseEntityDto {
    constructor(name: string, minutes: number, price: number, salePercent?: number);
    name: string;
    minutes: number;
    price: number;
    salePercent: number;
    static createTempInstance: () => TokenTypeDto;
}
