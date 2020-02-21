import { IsString, IsNotEmpty } from "class-validator";

export class FindTokenQuery {
  @IsNotEmpty()
  @IsString()
  id: string;
}
