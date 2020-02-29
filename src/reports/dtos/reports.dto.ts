import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsInt,
  IsUUID
} from "class-validator";
import { Type } from "class-transformer";
import { Column, Entity, ObjectID } from "typeorm";
import { BaseEntityDto } from "base/base-entity.dto";

export class ReportIdRequestParamsDto {
  constructor(reportId) {
    this._id = reportId;
  }

  @IsString()
  @IsNotEmpty()
  _id: string;
}

@Entity("reports")
export class ReportDto extends BaseEntityDto {

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Column({
    name: "used_minutes"
  })
  usedMinutes: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @Column({
    name: "date_report"
  })
  dateReport: Date;

  @IsUUID()
  @Column({
    name: "token_id",
    nullable: false,
    type: "uuid"
  })
  tokenId: ObjectID;

  @IsUUID()
  @Column({
    name: "user_id",
    nullable: false,
    type: "uuid"
  })
  userId: ObjectID;
}
