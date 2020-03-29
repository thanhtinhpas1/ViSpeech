import { ObjectID } from 'typeorm';
import { BaseEntityDto } from 'base/base-entity.dto';
export declare class ReportIdRequestParamsDto {
    constructor(reportId: any);
    _id: string;
}
export declare class ReportDto extends BaseEntityDto {
    usedMinutes: number;
    dateReport: Date;
    tokenId: ObjectID;
    userId: ObjectID;
}
