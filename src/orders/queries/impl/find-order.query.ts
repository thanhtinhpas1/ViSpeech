import { IsString, IsNotEmpty } from "class-validator";

export class FindOrderQuery {
  @IsNotEmpty()
  @IsString()
  id: string;
}
