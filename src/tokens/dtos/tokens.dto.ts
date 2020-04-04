import { BaseEntityDto } from 'base/base-entity.dto';
import { Type } from 'class-transformer';
import { IsEmpty, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { CONSTANTS } from 'common/constant';
import { ObjectID } from 'mongodb';
import { Column, Entity } from 'typeorm';

export class TokenIdRequestParamsDto {
    constructor(tokenId) {
        this._id = tokenId;
    }

    @IsString()
    @IsNotEmpty()
    _id: string;
}

@Entity('tokens')
export class TokenDto extends BaseEntityDto {
    constructor(value: string, userId, projectId, tokenType: string = CONSTANTS.TOKEN_TYPE.FREE, tokenTypeId = null, orderId = null) {
        super();
        this.value = value;
        this.userId = userId;
        this.projectId = projectId;
        this.tokenTypeId = tokenTypeId;
        this.tokenType = tokenType;
        this.orderId = orderId;
    }

    @IsOptional()
    @IsString()
    @Column({
        unique: true,
    })
    value: string;

    @IsString()
    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid',
    })
    userId: ObjectID;

    // @IsUUID()
    // free token does not have projectId, set projectId = ""
    @IsString()
    @Column({
        nullable: false,
    })
    projectId: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Column({
        default: 0,
        type: 'double'
    })
    minutes: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Column({
        default: 0,
        nullable: false,
        type: 'double'
    })
    usedMinutes: number;

    @IsOptional()
    @IsString()
    @IsUUID()
    @Column({
        nullable: false,
        type: 'uuid',
    })
    tokenTypeId: ObjectID;

    @IsOptional()
    @Column({
        default: true,
    })
    isValid: boolean;

    @IsOptional()
    @IsIn([
        CONSTANTS.TOKEN_TYPE.FREE,
        CONSTANTS.TOKEN_TYPE['50-MINS'],
        CONSTANTS.TOKEN_TYPE['200-MINS'],
        CONSTANTS.TOKEN_TYPE['500-MINS'],
    ])
    tokenType: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    orderId: ObjectID;
}
