import { IsEmpty, IsUUID, IsOptional } from "class-validator";
import {
  CreateDateColumn,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
  Column
} from "typeorm";
import { Utils } from "../utils";

export class BaseEntityDto {
  constructor() {
    this._id = Utils.getUuid();
  }

  @ObjectIdColumn()
  _id: string;

  @IsOptional()
  @IsUUID()
  @Column({
    nullable: false,
    type: "uuid"
  })
  transactionId: string;

  @IsEmpty()
  @CreateDateColumn({
    name: "created_date"
  })
  createdDate: Date;

  @IsEmpty()
  @UpdateDateColumn({
    name: "updated_date"
  })
  updatedDate: Date;
}
