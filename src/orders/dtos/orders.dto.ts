import { BaseEntityDto } from 'base/base-entity.dto';
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { CONSTANTS } from 'common/constant';
import { Column, Entity, ObjectID } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';

export class OrderIdRequestParamsDto {
  constructor(orderId) {
    this._id = orderId;
  }

  @IsString()
  @IsNotEmpty()
  _id: string;
}

@Entity('orders')
export class OrderDto extends BaseEntityDto {
  constructor(userId, tokenType: TokenTypeDto, tokenId = null, status = CONSTANTS.STATUS.PENDING) {
    super();
    this.userId = userId;
    this.tokenType = tokenType;
    this.tokenId = tokenId;
    this.status = status;
  }

  @IsOptional()
  @IsUUID()
  @Column({
    nullable: false,
    type: 'uuid',
  })
  tokenId: ObjectID;

  @IsNotEmpty()
  @Column({
    nullable: false,
  })
  tokenType: TokenTypeDto;

  @IsUUID()
  @Column({
    nullable: false,
    type: 'uuid',
  })
  userId: ObjectID;

  @IsOptional()
  @IsString()
  @IsIn([
    CONSTANTS.STATUS.PENDING,
    CONSTANTS.STATUS.SUCCESS,
    CONSTANTS.STATUS.FAILURE,
  ])
  @Column()
  status: string;
}
