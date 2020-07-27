import { BaseEntityDto } from 'base/base-entity.dto';
import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min } from 'class-validator';
import { CONSTANTS } from 'common/constant';
import { ObjectID } from 'mongodb';
import { Column, Entity } from 'typeorm';
import { ErrorUtils } from '../../utils/errorUtils';
import { ERR } from '../../common/error';

export class TokenIdRequestParamsDto {
    constructor(tokenId) {
        this._id = tokenId;
    }

    @IsString(ErrorUtils.getMessage('_id', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('_id', ERR.IsNotEmpty))
    _id: string;
}

@Entity('tokens')
export class TokenDto extends BaseEntityDto {
    constructor(value: string, userId, projectId, tokenType: string, tokenTypeId = null, orderId = null, name?: string) {
        super();
        this.name = name;
        this.value = value;
        this.userId = userId;
        this.projectId = projectId;
        this.tokenTypeId = tokenTypeId;
        this.tokenType = tokenType;
        this.orderId = orderId;
        this.isValid = true;
        this.usedMinutes = 0;
    }

    @IsOptional()
    @IsString(ErrorUtils.getMessage('name', ERR.IsString))
    @Column({ nullable: false, default: 'DEFAULT' })
    name: string;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('value', ERR.IsString))
    @Column({
        unique: true,
    })
    value: string;

    @IsNotEmpty(ErrorUtils.getMessage('userId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('userId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('userId', ERR.IsUUID))
    @Column({
        nullable: false,
        update: false,
        type: 'uuid',
    })
    userId: ObjectID;

    // free token does not have projectId, set projectId = ""
    @IsNotEmpty(ErrorUtils.getMessage('projectId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('projectId', ERR.IsString))
    @Column({
        nullable: false,
    })
    projectId: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber({ allowInfinity: false, allowNaN: false }, ErrorUtils.getMessage('minutes', ERR.IsNumber))
    @IsPositive(ErrorUtils.getMessage('minutes', ERR.IsPositive))
    @Column({
        default: 0,
        type: 'double'
    })
    minutes: number;

    @IsNotEmpty(ErrorUtils.getMessage('minutes', ERR.IsNotEmpty))
    @Type(() => Number)
    @IsNumber({ allowNaN: false, allowInfinity: false }, ErrorUtils.getMessage('usedMinutes', ERR.IsNumber))
    @Min(0)
    @Column({
        default: 0,
        nullable: false,
        type: 'double'
    })
    usedMinutes: number;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('tokenTypeId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('tokenTypeId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    tokenTypeId: ObjectID;

    @IsNotEmpty(ErrorUtils.getMessage('isValid', ERR.IsNotEmpty))
    @IsBoolean(ErrorUtils.getMessage('isValid', ERR.IsBoolean))
    @Column({
        default: true,
        nullable: false,
    })
    isValid: boolean;

    @IsOptional()
    @IsIn([
        CONSTANTS.TOKEN_TYPE.FREE,
        CONSTANTS.TOKEN_TYPE.TYPE_50_MINUTES,
        CONSTANTS.TOKEN_TYPE.TYPE_200_MINUTES,
        CONSTANTS.TOKEN_TYPE.TYPE_500_MINUTES,
    ])
    tokenType: string;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('orderId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('orderId', ERR.IsUUID))
    orderId: ObjectID;
}
