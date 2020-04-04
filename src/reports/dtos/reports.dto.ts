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

    @IsNotEmpty()
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
}
