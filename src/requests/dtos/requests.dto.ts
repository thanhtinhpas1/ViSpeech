import { Column, Entity } from "typeorm";
import {
  IsIP,
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty
} from "class-validator";
import { BaseEntityDto } from "base/base-entity.dto";

@Entity("requests")
export class RequestDto extends BaseEntityDto {

  @IsNotEmpty()
  @IsString()
  @Column()
  tokenId: string;

  @IsIP()
  @IsString()
  @Column()
  host: string;

  @IsNumber()
  @IsPositive()
  @Column({
    comment: "length of voice - minute"
  })
  length: number;
}
