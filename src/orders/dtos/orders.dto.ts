import { BaseEntityDto } from "base/base-entity.dto";
import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";
import { CONSTANTS } from "common/constant";
import { Column, Entity, ObjectID } from "typeorm";

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
    nullable: false,
    type: "uuid"
  })
  tokenTypeId: ObjectID;

  @IsUUID()
  @Column({
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
