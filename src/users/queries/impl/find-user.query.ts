import { IsString, IsNotEmpty } from "class-validator";

export class FindUserQuery {
  @IsNotEmpty()
  @IsString()
  id: string;
}
