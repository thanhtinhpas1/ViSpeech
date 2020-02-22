import { IsEmpty } from "class-validator";
import {
  CreateDateColumn,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn
} from "typeorm";

export class BaseEntityDto {
  @IsEmpty()
  @ObjectIdColumn()
  id: ObjectID;

  @IsEmpty()
  @CreateDateColumn({
    name: "created_date",
    nullable: true
  })
  createdDate: Date;

  @IsEmpty()
  @UpdateDateColumn({
    name: "updated_date",
    nullable: true
  })
  updatedDate;
}
