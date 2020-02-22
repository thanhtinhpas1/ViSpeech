import {Column, Entity, OneToMany} from 'typeorm';
import {BaseEntityDto} from 'base/base-entity.dto';
import {TokenDto} from './tokens.dto';
import {IsNotEmpty, IsNumber, IsPositive, IsString} from 'class-validator';

@Entity('token_types')
export class TokenTypeDto extends BaseEntityDto {
    constructor(name, minutes, price) {
        super();
        this.name = name;
        this.minutes = minutes;
        this.price = price;
    }

    @IsNotEmpty()
    @IsString()
    @Column()
    name: string;

    @IsNumber()
    @IsPositive()
    @Column({
        name: 'minutes',
    })
    minutes: number;

    @IsNumber()
    @IsPositive()
    @Column({
        name: 'price',
    })
    price: number;

    @IsNumber()
    @IsPositive()
    @Column({
        name: 'sale_percent',
        default: 0,
    })
    salePercent: number;

    @OneToMany(
        type => TokenDto,
        tokenDto => tokenDto.tokenType
    )
    tokens: TokenDto[];
}
