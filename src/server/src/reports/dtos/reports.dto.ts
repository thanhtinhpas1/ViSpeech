import { BaseEntityDto } from 'base/base-entity.dto';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
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

    @IsNotEmpty(ErrorUtils.getMessage('tokenId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('tokenId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('tokenId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid'
    })
    tokenId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('projectId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('projectId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('projectId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid'
    })
    projectId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('userId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('userId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('userId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid'
    })
    userId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('tokenTypeId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('tokenTypeId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('tokenTypeId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid'
    })
    tokenTypeId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('typeReport', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('typeReport', ERR.IsString))
    @IsIn([CONSTANTS.TASK.REPORT_DATE, CONSTANTS.TASK.REPORT_WEEK, CONSTANTS.TASK.REPORT_MONTH, CONSTANTS.TASK.REPORT_QUARTER, CONSTANTS.TASK.REPORT_YEAR])
    @Column({
        nullable: false,
    })
    typeReport: string;
}