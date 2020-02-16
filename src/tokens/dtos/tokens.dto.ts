import { IsString, IsNotEmpty, IsEmpty, IsNumber, IsPositive } from "class-validator";
import {
  Entity,
  Column,
  ManyToOne
} from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";
import { TokenTypeDto } from "./token-types.dto";

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
  constructor(value, userId, tokenType: TokenTypeDto) {
    super();
    this.value = value;
    this.userId = userId;
    this.tokenType = tokenType;
    if (tokenType) {
      this.minutes = tokenType.minutes;
    }
  }

  @Column({
    name: 'minutes',
    default: 0
  })
  minutes: number;

  @Column({
    name: 'used_minutes',
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
  @Column({
    name: "user_id"
  })
  userId: string;

  @ManyToOne(type => TokenTypeDto, tokenTypeDto => tokenTypeDto.tokens)
  tokenType: TokenTypeDto;

  @IsEmpty()
  @Column({
    default: true
  })
  isValid: boolean;
}
