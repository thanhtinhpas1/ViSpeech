import { IsString, IsNotEmpty, IsEmpty, IsDate, IsNumber, IsPositive } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

export class TokenIdRequestParamsDto {
  @IsString()
  tokenId: string;
}

@Entity("tokens")
export class TokenDto {

  @IsEmpty()
  @PrimaryGeneratedColumn('uuid', {
    name: 'id'
  })
  tokenId: string; 

  @IsNumber()
  @IsPositive()
  @Column({
    name: 'minute',
  })
  minute: number;


  @IsString()
  @IsNotEmpty()
  @Column()
  value: string;

  @IsString()
  @IsNotEmpty()
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
