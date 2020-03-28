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

    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid'
    })
    tokenId: ObjectID;

    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid'
    })
    userId: ObjectID;
}
