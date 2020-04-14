import { BaseEntityDto } from 'base/base-entity.dto';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, IsIn } from 'class-validator';
import { Column, Entity, ObjectID } from 'typeorm';
import { CONSTANTS } from 'common/constant';

export class ReportIdRequestParamsDto {
    constructor(reportId) {
        this._id = reportId;
    }

    @IsString()
    @IsNotEmpty()
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

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Column({
        type: 'double'
    })
    usedMinutes: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Column({
        nullable: false,
    })
    totalRequests: number;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    @Column()
    dateReport: Date;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid'
    })
    tokenId: ObjectID;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid'
    })
    projectId: ObjectID;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid'
    })
    userId: ObjectID;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid'
    })
    tokenTypeId: ObjectID;

    @IsNotEmpty()
    @IsString()
    @IsIn([CONSTANTS.TASK.REPORT_DATE, CONSTANTS.TASK.REPORT_WEEK, CONSTANTS.TASK.REPORT_MONTH, CONSTANTS.TASK.REPORT_QUARTER, CONSTANTS.TASK.REPORT_YEAR])
    @Column({
        nullable: false,
    })
    typeReport: string;
}