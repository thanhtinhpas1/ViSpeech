import { IsEmpty, IsNotEmpty, IsString, IsBoolean } from "class-validator";
import { Column, Entity } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";

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
  constructor(value, userId, tokenTypeId) {
    super();
    this.value = value;
    this.userId = userId;
    this.tokenTypeId = tokenTypeId;
  }

  @Column({
    name: "minutes",
    default: 0
  })
  minutes: number;

  @Column({
    name: "used_minutes",
    default: 0,
    nullable: true
  })
  usedMinutes: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  value: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  tokenTypeId: string;

  @IsEmpty()
  @Column({
    default: true
  })
  @IsBoolean()
  isValid: boolean;
}
