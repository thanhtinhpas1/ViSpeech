import { IsOptional, IsNumber, IsPositive } from "class-validator";
import { Type } from "class-transformer";

export class GetTokensQuery {
  constructor() { }

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  offset: number;
}

export class GetTokenTypesQuery {
  constructor() { }
}
