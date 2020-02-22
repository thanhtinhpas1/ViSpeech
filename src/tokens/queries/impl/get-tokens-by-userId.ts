import { IsString, IsNotEmpty } from "class-validator";

export class GetTokensByUserIdQuery {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
