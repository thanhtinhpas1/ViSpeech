import { IsString, IsNotEmpty, IsEmpty } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

export class OrderIdRequestParamsDto {
  @IsString()
  orderId: string;
}

@Entity("orders")
export class OrderDto {
  @IsEmpty()
  @ObjectIdColumn()
  _id: ObjectID; // name same with _id column in mongodb

  // @IsEmpty()
  // // @PrimaryGeneratedColumn('uuid')
  // orderId!: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  tokenId: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  userId: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;
}
