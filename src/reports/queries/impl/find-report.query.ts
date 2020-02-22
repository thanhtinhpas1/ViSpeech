import { IsString, IsNotEmpty } from "class-validator";

export class FindReportQuery {
  @IsNotEmpty()
  @IsString()
  id: string;
}
