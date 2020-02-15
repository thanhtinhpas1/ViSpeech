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
  @PrimaryGeneratedColumn('uuid', {
    name: 'id'
  })
  orderId: string; 

  @IsNotEmpty()
  @IsString()
  @Column({
    name: 'token_id'
  })
  tokenId: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    name: 'user_id'
  })
  userId: string;

  @CreateDateColumn({
    name: 'created_date'
  })
  created: string;

  @UpdateDateColumn({
    name: 'updated_date'
  })
  updated: string;
}
