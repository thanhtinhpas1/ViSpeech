import { IsOptional, IsNumber, IsPositive, Min } from "class-validator";
import { Type } from "class-transformer";

export class GetOrdersQuery {
  constructor() { }

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset: number;
}
