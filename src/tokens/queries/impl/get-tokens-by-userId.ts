import { IsNotEmpty, IsString } from "class-validator";

export class GetTokensByUserIdQuery {
  constructor(userId: string) {
    this.userId = userId;
  }

  @IsNotEmpty()
  @IsString()
  userId: string;
}
