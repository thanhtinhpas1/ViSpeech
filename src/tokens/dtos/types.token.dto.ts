import { Entity, Column } from "typeorm";
import { BaseDto } from "base/base.dto";
import { IsString } from "class-validator";

@Entity('types_token')
export class TypeTokenDto extends BaseDto {


}