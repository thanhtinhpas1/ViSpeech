import {IsEmpty, IsNotEmpty, IsString} from 'class-validator';
import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import {BaseEntityDto} from 'base/base-entity.dto';
import {TokenTypeDto} from './token-types.dto';
import {ReportDto} from '../../reports/dtos/reports.dto';

export class TokenIdRequestParamsDto {
    constructor(tokenId) {
        this.id = tokenId;
    }

    @IsString()
    @IsNotEmpty()
    id: string;
}

@Entity('tokens')
export class TokenDto extends BaseEntityDto {
    constructor(value, userId, tokenType: TokenTypeDto) {
        super();
        this.value = value;
        this.userId = userId;
        this.tokenType = tokenType;
        if (tokenType) {
            this.minutes = tokenType.minutes;
        }
    }

    @Column({
        name: 'minutes',
        default: 0,
    })
    minutes: number;

    @Column({
        name: 'used_minutes',
        default: 0,
        nullable: true,
    })
    usedMinutes: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    value: string;

    @IsString()
    @IsNotEmpty()
    @Column({
        name: 'user_id',
    })
    userId: string;

    @ManyToOne(
        () => TokenTypeDto,
        tokenTypeDto => tokenTypeDto.tokens,
    )
    tokenType: TokenTypeDto;

    @IsEmpty()
    @Column({
        default: true,
    })
    isValid: boolean;

    @OneToMany(
        () => ReportDto,
        reportDto => reportDto.token,
    )
    reports: ReportDto[];
}
