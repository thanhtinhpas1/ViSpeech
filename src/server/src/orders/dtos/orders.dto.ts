import { BaseEntityDto } from 'base/base-entity.dto';
import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CONSTANTS } from 'common/constant';
import { Column, Entity, ObjectID } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Type } from 'class-transformer';
import { ErrorUtils } from '../../utils/errorUtils';
import { ERR } from '../../common/error';

export class OrderIdRequestParamsDto {
    constructor(orderId) {
        this._id = orderId;
    }

    @IsString(ErrorUtils.getMessage('_id', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('_id', ERR.IsNotEmpty))
    _id: string;
}

export class PaymentIntent {
    constructor(id) {
        this.id = id;
    }

    @IsString(ErrorUtils.getMessage('payment intent id', ERR.IsString))
    @IsNotEmpty(ErrorUtils.getMessage('payment intent id', ERR.IsNotEmpty))
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

    @IsNotEmpty(ErrorUtils.getMessage('tokenType', ERR.IsNotEmpty))
    @ValidateNested()
    @Type(() => TokenTypeDto)
    @Column()
    tokenType: TokenTypeDto;

    @IsNotEmpty(ErrorUtils.getMessage('userId', ERR.IsNotEmpty))
    @IsString(ErrorUtils.getMessage('userId', ERR.IsString))
    @IsUUID('all', ErrorUtils.getMessage('userId', ERR.IsUUID))
    @Column({
        nullable: false,
        type: 'uuid',
    })
    userId: ObjectID;

    @IsOptional()
    @IsString(ErrorUtils.getMessage('status', ERR.IsString))
    @IsIn([
        CONSTANTS.STATUS.PENDING,
        CONSTANTS.STATUS.SUCCESS,
        CONSTANTS.STATUS.FAILURE,
    ], { message: ErrorUtils.getMessage('status', ERR.IsIn).message })
    @Column()
    status: string;

    @IsNotEmpty(ErrorUtils.getMessage('upgradeToken', ERR.IsNotEmpty))
    @IsBoolean(ErrorUtils.getMessage('upgradeToken', ERR.IsBoolean))
    @Column({
        default: true,
        nullable: false,
    })
    upgradeToken: boolean;
}
