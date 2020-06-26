import { BaseEntityDto } from 'base/base-entity.dto';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, IsIn } from 'class-validator';
import { Column, Entity, ObjectID } from 'typeorm';
import { CONSTANTS } from 'common/constant';
import { ErrUtil } from "../../utils/err.util";
import { ERR } from "../../common/error";

export class ReportIdRequestParamsDto {
    constructor(reportId) {
        this._id = reportId;
    }

    @IsString(ErrUtil.getMessage('_id', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('_id', ERR.IsNotEmpty))
    _id: string;
}

@Entity('reports')
export class ReportDto extends BaseEntityDto {
    constructor(usedMinutes: number, dateReport: Date, tokenId: any, tokenTypeId: any, projectId: any, userId: any, totalRequests: number,
        typeReport: string) {
        super();
        this.usedMinutes = usedMinutes;
        this.dateReport = dateReport;
        this.tokenId = tokenId;
        this.tokenTypeId = tokenTypeId;
        this.projectId = projectId;
        this.userId = userId;
        this.totalRequests = totalRequests;
        this.typeReport = typeReport;
    }

    @IsNotEmpty(ErrUtil.getMessage('usedMinutes', ERR.IsNotEmpty))
    @Type(() => Number)
    @IsNumber({}, ErrUtil.getMessage('usedMinutes', ERR.IsNumber))
    @IsPositive(ErrUtil.getMessage('usedMinutes', ERR.IsPositive))
    @Column({
        type: 'double'
    })
    usedMinutes: number;

    @IsNotEmpty(ErrUtil.getMessage('totalRequests', ERR.IsNotEmpty))
    @Type(() => Number)
    @IsNumber({}, ErrUtil.getMessage('totalRequests', ERR.IsNumber))
    @IsPositive(ErrUtil.getMessage('totalRequests', ERR.IsPositive))
    @Column({
        nullable: false,
    })
    totalRequests: number;

    @Type(() => Date)
    @IsDate(ErrUtil.getMessage('dateReport', ERR.IsDate))
    @IsNotEmpty(ErrUtil.getMessage('dateReport', ERR.IsNotEmpty))
    @Column()
    dateReport: Date;

    @IsNotEmpty(ErrUtil.getMessage('tokenId', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('tokenId', ERR.IsString))
    @IsUUID('all', ErrUtil.getMessage('tokenId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid'
    })
    tokenId: ObjectID;

    @IsNotEmpty(ErrUtil.getMessage('projectId', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('projectId', ERR.IsString))
    @IsUUID('all', ErrUtil.getMessage('projectId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid'
    })
    projectId: ObjectID;

    @IsNotEmpty(ErrUtil.getMessage('userId', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('userId', ERR.IsString))
    @IsUUID('all', ErrUtil.getMessage('userId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid'
    })
    userId: ObjectID;

    @IsNotEmpty(ErrUtil.getMessage('tokenTypeId', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('tokenTypeId', ERR.IsString))
    @IsUUID('all', ErrUtil.getMessage('tokenTypeId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid'
    })
    tokenTypeId: ObjectID;

    @IsNotEmpty(ErrUtil.getMessage('typeReport', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('typeReport', ERR.IsString))
    @IsIn([CONSTANTS.TASK.REPORT_DATE, CONSTANTS.TASK.REPORT_WEEK, CONSTANTS.TASK.REPORT_MONTH, CONSTANTS.TASK.REPORT_QUARTER, CONSTANTS.TASK.REPORT_YEAR])
    @Column({
        nullable: false,
    })
    typeReport: string;
}