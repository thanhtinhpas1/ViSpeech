import { IsString, IsNotEmpty, IsEmpty } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
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

  @IsEmpty()
  @CreateDateColumn({
    name: 'created_date',
    nullable: true
  })
  created: string;

  @UpdateDateColumn({
    name: 'updated_date',
    nullable: true
  })
  updated: string;
}
