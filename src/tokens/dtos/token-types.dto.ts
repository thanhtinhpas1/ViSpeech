import { Entity, OneToMany } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";
import { TokenDto } from "./tokens.dto";

@Entity("token_types")
export class TokenTypeDto extends BaseEntityDto {
    @OneToMany(type => TokenDto, tokenDto => tokenDto.tokenType)
    tokens: TokenDto[];
}
