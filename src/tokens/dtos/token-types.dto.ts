import { Column, Entity } from 'typeorm';
import { BaseEntityDto } from 'base/base-entity.dto';
import { IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min, } from 'class-validator';
import { Type } from 'class-transformer';
import { CONSTANTS } from 'common/constant';

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
        CONSTANTS.TOKEN_TYPE.TYPE_50_MINUTES,
        CONSTANTS.TOKEN_TYPE.TYPE_200_MINUTES,
        CONSTANTS.TOKEN_TYPE.TYPE_500_MINUTES,
    ])
    @Column({unique: true})
    name: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Column({
        type: 'double'
    })
    minutes: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Column({
        type: 'double'
    })
    price: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(100)
    @Column({
        default: 0,
        type: 'double'
    })
    salePercent: number;

    static createTempInstance = () => {
        return new TokenTypeDto('', 0, 0, 0);
    };
}