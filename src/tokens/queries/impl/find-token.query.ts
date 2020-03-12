import { IsNotEmpty, IsString } from "class-validator";

export class FindTokenQuery {
  constructor(id: string) {
    this.id = id;
  }
  
  @IsNotEmpty()
  @IsString()
  id: string;
}
