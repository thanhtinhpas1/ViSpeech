import { BaseEntityDto } from 'base/base-entity.dto';
export declare class RequestDto extends BaseEntityDto {
    constructor(tokenId: string, host: string, duration: number, mimeType: string);
    tokenId: string;
    host: string;
    duration: number;
    mimeType: any;
}
