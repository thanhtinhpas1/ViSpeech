import { BaseEntityDto } from 'base/base-entity.dto';
import { ObjectID } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
export declare class OrderIdRequestParamsDto {
    constructor(orderId: any);
    _id: string;
}
export declare class OrderDto extends BaseEntityDto {
    constructor(userId: any, tokenType: TokenTypeDto, token: TokenDto, status?: string);
    token: TokenDto;
    tokenType: TokenTypeDto;
    userId: ObjectID;
    status: string;
}
