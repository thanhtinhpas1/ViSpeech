import { IsNotEmpty, IsString } from "class-validator";

export class FindOrderQuery {
  constructor(id: string) {
    this.id = id;
  }

  @IsNotEmpty()
  @IsString()
  id: string;
}
