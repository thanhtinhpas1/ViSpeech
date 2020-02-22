import {IsDate, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID} from 'class-validator';
import {Column, Entity, ObjectID} from 'typeorm';
import {BaseEntityDto} from 'base/base-entity.dto';

export class ReportIdRequestParamsDto {

    @IsString()
    @IsNotEmpty()
    id: string;
}

@Entity('reports')
export class ReportDto extends BaseEntityDto {

    @IsNumber()
    @IsPositive()
    @Column({
        name: 'used_minutes',
        default: 0,
        nullable: true,
    })
    usedMinutes: number;

    @IsDate()
    @IsNotEmpty()
    @Column({
        name: 'date_report',
    })
    dateReport: Date;

    @IsUUID()
    @Column({
        name: 'user_id',
        nullable: false,
        type: 'uuid',
    })
    userId: ObjectID;

}
