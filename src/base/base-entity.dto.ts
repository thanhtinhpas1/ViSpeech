import { IsEmpty, IsUUID } from "class-validator";
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
    this.transactionId = Utils.getUuid();
  }

    @ObjectIdColumn()
    _id: ObjectID;

  @IsUUID()
  @Column({
    name: "transaction_id",
    nullable: false,
    type: "uuid"
  })
  transactionId: ObjectID;

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
  updatedDate: Date;
}
