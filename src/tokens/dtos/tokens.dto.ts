import { IsEmpty, IsNotEmpty, IsString, IsNumber, IsPositive, IsOptional, IsUUID, IsIn } from "class-validator";
import { Column, Entity } from "typeorm";
import { ObjectID } from 'mongodb'
import { BaseEntityDto } from "base/base-entity.dto";
import { Type } from "class-transformer";
import { CONSTANTS } from "common/constant";

export class TokenIdRequestParamsDto {
  constructor(tokenId) {
    this.id = tokenId;
  }

  @IsString()
  @IsNotEmpty()
  id: string;
}

@Entity("tokens")
export class TokenDto extends BaseEntityDto {
  constructor(value, userId, tokenTypeId = "", tokenType = "FREE") {
    super();
    this.value = value;
    this.userId = userId;
    this.tokenTypeId = tokenTypeId;
    this.tokenType = tokenType;
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
  tokenTypeId: string;

  @IsEmpty()
  @Column({
    name: "is_valid",
    default: true
  })
  isValid: boolean;

  @IsOptional()
  @IsIn([CONSTANTS.TOKEN_TYPE.FREE], {
    each: true
  })
  tokenType: string;
}
