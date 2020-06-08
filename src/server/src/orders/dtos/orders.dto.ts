import {BaseEntityDto} from 'base/base-entity.dto';
import {IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested, IsBoolean} from 'class-validator';
import {CONSTANTS} from 'common/constant';
import {Column, Entity, ObjectID} from 'typeorm';
import {TokenTypeDto} from 'tokens/dtos/token-types.dto';
import {TokenDto} from 'tokens/dtos/tokens.dto';
import { Type } from 'class-transformer';
import { ErrUtil } from "../../utils/err.util";
import { ERR } from "../../common/error";

export class OrderIdRequestParamsDto {
    constructor(orderId) {
        this._id = orderId;
    }

    @IsString(ErrUtil.getMessage('_id', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('_id', ERR.IsNotEmpty))
    _id: string;
}

export class PaymentIntent {
    constructor(id) {
        this.id = id;
    }

    @IsString(ErrUtil.getMessage('payment intent id', ERR.IsString))
    @IsNotEmpty(ErrUtil.getMessage('payment intent id', ERR.IsNotEmpty))
    id: string;
}

@Entity('orders')
export class OrderDto extends BaseEntityDto {
    constructor(userId, tokenType: TokenTypeDto, token: TokenDto, status = CONSTANTS.STATUS.PENDING, upgradeToken: boolean = false) {
        super();
        this.userId = userId;
        this.tokenType = tokenType;
        this.token = token;
        this.status = status;
        this.upgradeToken = upgradeToken;
    }

    @IsOptional()
    @ValidateNested()
    @Type(() => TokenDto)
    @Column()
    token: TokenDto;

    @IsNotEmpty(ErrUtil.getMessage('tokenType', ERR.IsNotEmpty))
    @ValidateNested()
    @Type(() => TokenTypeDto)
    @Column()
    tokenType: TokenTypeDto;

    @IsNotEmpty(ErrUtil.getMessage('userId', ERR.IsNotEmpty))
    @IsString(ErrUtil.getMessage('userId', ERR.IsString))
    @IsUUID('all', ErrUtil.getMessage('userId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    userId: ObjectID;

    @IsOptional()
    @IsString(ErrUtil.getMessage('status', ERR.IsString))
    @IsIn([
        CONSTANTS.STATUS.PENDING,
        CONSTANTS.STATUS.SUCCESS,
        CONSTANTS.STATUS.FAILURE,
    ])
    @Column()
    status: string;

    @IsNotEmpty(ErrUtil.getMessage('upgradeToken', ERR.IsNotEmpty))
    @IsBoolean(ErrUtil.getMessage('upgradeToken', ERR.IsBoolean))
    @Column({
        default: true,
        nullable: false,
    })
    upgradeToken: boolean;
}
