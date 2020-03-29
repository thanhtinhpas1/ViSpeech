import { BaseEntityDto } from 'base/base-entity.dto';
import { ObjectID } from 'mongodb';
export declare class TokenIdRequestParamsDto {
    constructor(tokenId: any);
    _id: string;
}
export declare class TokenDto extends BaseEntityDto {
    constructor(value: string, userId: any, projectId: any, tokenType?: string, tokenTypeId?: any, orderId?: any);
    value: string;
    userId: ObjectID;
    projectId: string;
    minutes: number;
    usedMinutes: number;
    tokenTypeId: ObjectID;
    isValid: boolean;
    tokenType: string;
    orderId: ObjectID;
}
