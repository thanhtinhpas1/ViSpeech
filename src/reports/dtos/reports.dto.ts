import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString
} from "class-validator";
import { Column, Entity } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";

export class ReportIdRequestParamsDto {
  constructor(reportId) {
    this.id = reportId;
  }

  @IsString()
  @IsNotEmpty()
  id: string;
}

@Entity("reports")
export class ReportDto extends BaseEntityDto {

  @IsNotEmpty()
  @IsString()
  @Column()
  tokenId: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  userId: string;

  @IsNumber()
  @IsPositive()
  @Column({
    name: "used_minutes",
    default: 0,
    nullable: true
  })
  usedMinutes: number;

  @IsDate()
  @IsNotEmpty()
  @Column({
    name: "date_report"
  })
  dateReport: Date;
}
