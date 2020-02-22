import { IsNotEmpty, IsString } from "class-validator";

export class FindOrderQuery {
  @IsNotEmpty()
  @IsString()
  id: string;
}
