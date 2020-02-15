import { Entity, Column } from "typeorm";
import { BaseDto } from "base/base.dto";
import { IsString, IsNumber, IsPositive, Max, IsBoolean } from "class-validator";

@Entity('types_token')
export class TypeTokenDto extends BaseDto {

    @IsString()
    @Column()
    name: string;

    @IsNumber()
    @IsPositive()
    @Column({
        type: 'double',
    })
    price: number;
    
    @IsNumber()
    @IsPositive()
    @Column({
        default: 60 // default 60 minute/month
    })
    minute: number

    @IsBoolean()
    @Column({
        name: 'is_support',
        default: false // default not support architect 
    })
    isSupport: boolean;
}