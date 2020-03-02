import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID
} from "class-validator";
import { Column, Entity, ObjectID } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";
import { Type } from "class-transformer";

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
  @IsUUID()
  @Column({
    name: "token_id",
    nullable: false,
    type: "uuid"
  })
  tokenId: ObjectID;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Column()
  price: number;

  @IsUUID()
  @Column({
    name: "user_id",
    nullable: false,
    type: "uuid"
  })
  userId: ObjectID;
}
