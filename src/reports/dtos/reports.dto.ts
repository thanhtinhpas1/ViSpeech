import { IsString, IsNotEmpty, IsEmpty, IsDate, IsNumber, IsPositive } from "class-validator";
import {
  Entity,
  Column,
  ManyToOne
} from "typeorm";
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
  constructor(value, userId) {
    super();
    this.value = value;
    this.userId = userId;
  }

  @IsNumber()
  @IsPositive()
  @Column({
    name: 'minutes',
  })
  minutes: number;

  @IsNumber()
  @IsPositive()
  @Column({
    name: 'used_minutes',
    default: 0,
    nullable: true
  })
  usedMinutes: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  value: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: "user_id"
  })
  userId: string;
}
