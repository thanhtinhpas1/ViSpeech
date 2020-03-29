import { BaseEntityDto } from 'base/base-entity.dto';
import { IsIP, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity('requests')
export class RequestDto extends BaseEntityDto {

    constructor(tokenId: string, host: string, duration:number, mimeType:string) {
        super();
        this.tokenId = tokenId;
        this.host = host;
        this.duration = duration;
        this.mimeType = mimeType;
    }

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
        comment: 'length of voice - minute',
        type: 'double'
    })
    duration: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    mimeType;
}
