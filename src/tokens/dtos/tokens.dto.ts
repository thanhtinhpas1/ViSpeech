import { IsString, IsNotEmpty, IsEmpty } from "class-validator";
import { Entity, Column, ManyToOne } from "typeorm";
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
  constructor(value, userId) {
    super();
    this.value = value;
    this.userId = userId;
  }

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
}
