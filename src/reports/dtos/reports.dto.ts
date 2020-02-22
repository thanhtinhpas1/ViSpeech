import {IsDate, IsNotEmpty, IsNumber, IsPositive, IsString} from 'class-validator';
import {Column, Entity, ManyToOne} from 'typeorm';
import {BaseEntityDto} from 'base/base-entity.dto';
import {UserDto} from '../../users/dtos/users.dto';
import {TokenDto} from '../../tokens/dtos/tokens.dto';

export class ReportIdRequestParamsDto {
    constructor(reportId) {
        this.id = reportId;
    }

    @IsString()
    @IsNotEmpty()
    id: string;
}

@Entity('reports')
export class ReportDto extends BaseEntityDto {
    constructor(value, userId) {
        super();
    }

    @IsNumber()
    @IsPositive()
    @Column({
        name: 'used_minutes',
        default: 0,
        nullable: true,
    })
    usedMinutes: number;

    @ManyToOne(() => UserDto,
        userDto => userDto.reports,
    )
    user: UserDto;

    @ManyToOne(
        () => TokenDto,
        tokenDto => tokenDto.reports,
    )
    token: TokenDto;

    @IsDate()
    @IsNotEmpty()
    @Column({
        name: 'date_report',
    })
    dateReport: Date;
}
