import { Entity, Column } from "typeorm";
import { BaseDto } from "base/base.dto";
import { IsString, IsIP, IsNumber, IsPositive } from "class-validator";

@Entity('requests')
export class RequestDto extends BaseDto {

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
 