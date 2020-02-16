import { Entity, OneToMany, Column } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";
import { TokenDto } from "./tokens.dto";
import { IsNotEmpty, IsString } from "class-validator";

@Entity("token_types")
export class TokenTypeDto extends BaseEntityDto {
  constructor(name) {
    super();
    this.name = name;
  }

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @OneToMany(
    type => TokenDto,
    tokenDto => tokenDto.tokenType
  )
  tokens: TokenDto[];
}
