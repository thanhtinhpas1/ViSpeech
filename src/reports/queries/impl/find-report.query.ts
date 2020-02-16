import { IsString } from "class-validator";

export class FindReportQuery {
  @IsString()
  _id: string;
}
