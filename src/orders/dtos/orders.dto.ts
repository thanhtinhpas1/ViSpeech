import { IsString, IsNotEmpty, IsEmpty } from "class-validator";
import { Entity, Column } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";

export class OrderIdRequestParamsDto {
  constructor(orderId) {
    this.id = orderId;
  }

  @IsString()
  @IsNotEmpty()
  id: string;
}

@Entity("orders")
export class OrderDto extends BaseEntityDto {
  constructor(tokenId, userId) {
    super();
    this.tokenId = tokenId;
    this.userId = userId;
  }

  @IsNotEmpty()
  @IsString()
  @Column({
    name: "token_id"
  })
  tokenId: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    name: "user_id"
  })
  userId: string;
}
