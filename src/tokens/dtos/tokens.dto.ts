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

export class TokenIdRequestParamsDto {
  @IsString()
  tokenId: string;
}

@Entity("tokens")
export class TokenDto {
  @IsEmpty()
  @ObjectIdColumn()
  _id: ObjectID; // name same with _id column in mongodb

  // @IsEmpty()
  // // @PrimaryGeneratedColumn('uuid')
  // tokenId!: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  value: string;

  @IsString()
  @IsNotEmpty()
  @ObjectIdColumn()
  userId: ObjectID;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;
}
