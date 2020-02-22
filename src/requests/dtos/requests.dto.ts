import {Column, Entity} from 'typeorm';
import {IsIP, IsNumber, IsPositive, IsString} from 'class-validator';
import {BaseEntityDto} from 'base/base-entity.dto';

@Entity('requests')
export class RequestDto extends BaseEntityDto {

    @IsString()
    @Column({
        name: 'token_id'
    })
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
 