import { Column, Entity } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsIn } from "class-validator";
import { Type } from "class-transformer";
import { CONSTANTS } from "common/constant";

@Entity("token_types")
export class TokenTypeDto extends BaseEntityDto {
  constructor(name, minutes, price) {
    super();
    this.name = name;
    this.minutes = minutes;
    this.price = price;
  }

  @IsNotEmpty()
  @IsString()
  @IsIn([CONSTANTS.TOKEN_TYPE.FREE])
  @Column()
  name: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Column()
  minutes: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Column()
  price: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Column({
    name: "sale_percent",
    default: 0
  })
  salePercent: number;
}
