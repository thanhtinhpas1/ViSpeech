import {IsNotEmpty, IsNumber, IsPositive, IsString} from 'class-validator';
import {Column, Entity} from 'typeorm';
import {BaseEntityDto} from 'base/base-entity.dto';

export class OrderIdRequestParamsDto {
    constructor(orderId) {
        this.id = orderId;
    }

    @IsString()
    @IsNotEmpty()
    id: string;
}

@Entity('orders')
export class OrderDto extends BaseEntityDto {

    @IsNotEmpty()
    @IsString()
    @Column()
    tokenId: string;

    @IsNumber()
    @IsPositive()
    @Column()
    price: number;

    @IsNotEmpty()
    @IsString()
    @Column()
    userId: string;
}
