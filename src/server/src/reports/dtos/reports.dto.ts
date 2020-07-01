import { BaseEntityDto } from 'base/base-entity.dto';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, IsOptional } from 'class-validator';
import { Column, Entity, ObjectID } from 'typeorm';
import { CONSTANTS } from 'common/constant';
import { ErrorUtils } from "../../utils/errorUtils";
import { ERR } from "../../common/error";

export class ReportIdRequestParamsDto {
    constructor(reportId) {
        this._id = reportId;
    }

    @IsString(ErrorUtils.getMessage('_id', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('_id', ERR.IsNotEmpty))
    _id: string;
}

@Entity('reports')
export class ReportDto extends BaseEntityDto {
    constructor(usedMinutes: number, dateReport: Date, totalRequests: number, reportType: string, timeType: string) {
        super();
        this.usedMinutes = usedMinutes;
        this.dateReport = dateReport;
        this.totalRequests = totalRequests;
        this.reportType = reportType;
        this.timeType = timeType;
    }

    @IsNotEmpty(ErrorUtils.getMessage('usedMinutes', ERR.IsNotEmpty))
    @Type(() => Number)
    @IsNumber({}, ErrorUtils.getMessage('usedMinutes', ERR.IsNumber))
    @IsPositive(ErrorUtils.getMessage('usedMinutes', ERR.IsPositive))
    @Column({
        type: 'double'
    })
    usedMinutes: number;

    @IsNotEmpty(ErrorUtils.getMessage('totalRequests', ERR.IsNotEmpty))
    @Type(() => Number)
    @IsNumber({}, ErrorUtils.getMessage('totalRequests', ERR.IsNumber))
    @IsPositive(ErrorUtils.getMessage('totalRequests', ERR.IsPositive))
    @Column({
        nullable: false,
    })
    totalRequests: number;

    @Type(() => Date)
    @IsDate(ErrorUtils.getMessage('dateReport', ERR.IsDate))
    @IsNotEmpty(ErrorUtils.getMessage('dateReport', ERR.IsNotEmpty))
    @Column()
    dateReport: Date;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('tokenId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('tokenId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid'
    })
    tokenId: ObjectID;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('projectId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('projectId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid'
    })
    projectId: ObjectID;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('userId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('userId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid'
    })
    userId: ObjectID;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('tokenTypeId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('tokenTypeId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid'
    })
    tokenTypeId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('reportType', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('reportType', ERR.IsString))
    @IsIn([CONSTANTS.STATISTICS_TYPE.PROJECT, CONSTANTS.STATISTICS_TYPE.TOKEN, CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE, CONSTANTS.STATISTICS_TYPE.USER, CONSTANTS.STATISTICS_TYPE.USER_TOKEN_TYPE])
    @Column({
        nullable: false,
    })
    reportType: string;

    @IsNotEmpty(ErrorUtils.getMessage('timeType', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('timeType', ERR.IsString))
    @IsIn([CONSTANTS.TIME_TYPE.DATE, CONSTANTS.TIME_TYPE.WEEK, CONSTANTS.TIME_TYPE.MONTH, CONSTANTS.TIME_TYPE.QUARTER, CONSTANTS.TIME_TYPE.YEAR])
    @Column({
        nullable: false,
    })
    timeType: string;
}