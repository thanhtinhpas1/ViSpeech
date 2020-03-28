import {Column, Entity} from 'typeorm';
import {IsIP, IsNotEmpty, IsNumber, IsPositive, IsString} from 'class-validator';
import {BaseEntityDto} from 'base/base-entity.dto';

@Entity('requests')
export class RequestDto extends BaseEntityDto {

    @IsNotEmpty()
    @IsString()
    @Column()
    tokenId: string;

    @IsIP()
    @IsString()
    @Column()
    host: string;

    @IsNumber()
    @IsPositive()
    @Column({
        comment: 'length of voice - minute'
    })
    length: number;
}
