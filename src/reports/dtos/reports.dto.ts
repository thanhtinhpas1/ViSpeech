import {IsDate, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID} from 'class-validator';
import {Type} from 'class-transformer';
import {Column, Entity, ObjectID} from 'typeorm';
import {BaseEntityDto} from 'base/base-entity.dto';

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
    constructor(usedMinutes: number, dateReport: Date, tokenId) {
        super();
        this.usedMinutes = usedMinutes;
        this.dateReport = dateReport;
        this.tokenId = tokenId;
    }

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Column()
    usedMinutes: number;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    @Column()
    dateReport: Date;

    @IsString()
    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid'
    })
    tokenId: ObjectID;

    @IsString()
    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid'
    })
    projectId: ObjectID;

    @IsString()
    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid'
    })
    userId: ObjectID;

    @IsString()
    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid'
    })
    tokenTypeId: ObjectID;
}
