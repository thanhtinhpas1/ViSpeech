import { IsNotEmpty, IsString } from "class-validator";

export class FindReportQuery {
  constructor(id: string) {
    this.id = id;
  }

  @IsNotEmpty()
  @IsString()
  id: string;
}
