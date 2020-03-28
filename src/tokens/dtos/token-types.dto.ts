import {Column, Entity} from 'typeorm';
import {BaseEntityDto} from 'base/base-entity.dto';
import {IsIn, IsNotEmpty, IsNumber, IsPositive, IsString,} from 'class-validator';
import {Type} from 'class-transformer';
import {CONSTANTS} from 'common/constant';

@Entity('token_types')
export class TokenTypeDto extends BaseEntityDto {
    constructor(name: string, minutes: number, price: number, salePercent: number = 0) {
        super();
        this.name = name;
        this.minutes = minutes;
        this.price = price;
        this.salePercent = salePercent;
    }

    @IsNotEmpty()
    @IsString()
    @IsIn([
        CONSTANTS.TOKEN_TYPE.FREE,
        CONSTANTS.TOKEN_TYPE['50-MINS'],
        CONSTANTS.TOKEN_TYPE['200-MINS'],
        CONSTANTS.TOKEN_TYPE['500-MINS'],
    ])
    @Column()
    name: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Column()
    minutes: number;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Column()
    price: number;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Column({
        default: 0,
    })
    salePercent: number;

    static createTempInstance = () => {
        return new TokenTypeDto('', 0, 0, 0);
    };
}