import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  IsIn,
  IsOptional
} from "class-validator";
import { Column, Entity, ObjectID } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";
import { Type } from "class-transformer";
import { CONSTANTS } from "common/constant";

export class OrderIdRequestParamsDto {
  constructor(orderId) {
    this._id = orderId;
  }

  @IsString()
  @IsNotEmpty()
  _id: string;
}

@Entity("orders")
export class OrderDto extends BaseEntityDto {
  constructor(userId, tokenTypeId, tokenId = null, status = CONSTANTS.STATUS.PENDING) {
    super();
    this.userId = userId;
    this.tokenTypeId = tokenTypeId;
    this.tokenId = tokenId;
    this.status = status;
  }

  @IsOptional()
  @IsUUID()
  @Column({
    name: "token_id",
    nullable: false,
    type: "uuid"
  })
  tokenId: ObjectID;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Column()
  minutes: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Column()
  price: number;

  @IsUUID()
  @Column({
    name: "token_type_id",
    nullable: false,
    type: "uuid"
  })
  tokenTypeId: ObjectID;

  @IsUUID()
  @Column({
    name: "user_id",
    nullable: false,
    type: "uuid"
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
