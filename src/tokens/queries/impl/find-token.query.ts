import { IsString } from "class-validator";

export class FindTokenQuery {
  @IsString()
  _id: string;
}
