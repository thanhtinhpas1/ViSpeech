import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  IsUUID,
  IsIn
} from "class-validator";
import { Column, Entity } from "typeorm";
import { ObjectID } from "mongodb";
import { BaseEntityDto } from "base/base-entity.dto";
import { Type } from "class-transformer";
import { CONSTANTS } from "common/constant";

export class TokenIdRequestParamsDto {
  constructor(tokenId) {
    this._id = tokenId;
  }

  @IsString()
  @IsNotEmpty()
  _id: string;
}

@Entity("tokens")
export class TokenDto extends BaseEntityDto {
  constructor(
    value,
    userId,
    tokenType = CONSTANTS.TOKEN_TYPE.FREE,
    tokenTypeId = null,
    orderId = null,
  ) {
    super();
    this.value = value;
    this.userId = userId;
    this.tokenTypeId = tokenTypeId;
    this.tokenType = tokenType;
    this.orderId = orderId;
  }

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Column({
    name: "minutes",
    default: 0
  })
  minutes: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Column({
    name: "used_minutes",
    default: 0,
    nullable: false
  })
  usedMinutes: number;

  @IsString()
  @IsNotEmpty()
  @Column({
    unique: true
  })
  value: string;

  @IsUUID()
  @Column({
    name: "user_id",
    nullable: false,
    type: "uuid"
  })
  userId: ObjectID;

  @IsOptional()
  @IsUUID()
  @Column({
    name: "token_type_id",
    nullable: false,
    type: "uuid"
  })
  tokenTypeId: ObjectID;

  @IsEmpty()
  @Column({
    name: "is_valid",
    default: true
  })
  isValid: boolean;

  @IsOptional()
  @IsIn([
    CONSTANTS.TOKEN_TYPE.FREE,
    CONSTANTS.TOKEN_TYPE["50-MINS"],
    CONSTANTS.TOKEN_TYPE["200-MINS"],
    CONSTANTS.TOKEN_TYPE["500-MINS"],
    CONSTANTS.TOKEN_TYPE.DEAL
  ])
  tokenType: string;

  @IsOptional()
  @IsUUID()
  orderId: ObjectID;
}
