import { BaseEntityDto } from 'base/base-entity.dto';
import { IsIP, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, IsOptional } from 'class-validator';
import { Column, Entity } from 'typeorm';

export class FindRequestsParam {
    constructor(projectId: string) {
        this.projectId = projectId;
    }

    @IsOptional()
    @IsUUID()
    @IsString()
    projectId: string;
}

@Entity('requests')
export class RequestDto extends BaseEntityDto {

    constructor(tokenId: string, projectId: string, fileName: string, encoding: string, size: string,
        duration: number, mimeType: string) {
        super();
        this.tokenId = tokenId;
        this.fileName = fileName;
        this.encoding = encoding;
        this.size = size;
        this.projectId = projectId;
        this.duration = duration;
        this.mimeType = mimeType;
    }

    @IsNotEmpty()
    @IsString()
    @Column()
    tokenId: string;

    @IsNotEmpty()
    @IsUUID()
    @Column()
    projectId: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    fileName: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    encoding: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    size: string;

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
