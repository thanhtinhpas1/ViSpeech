import {
  IsString,
  IsEmail,
  IsBoolean,
  IsNotEmpty,
  IsEmpty,
  IsNumber
} from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ObjectIdColumn,
  ObjectID,
  Index,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

export class UserIdRequestParamsDto {
  @IsString()
  userId: string;
}

@Entity("users")
export class UserDto {
  @IsEmpty()
  @ObjectIdColumn()
  _id: ObjectID; // name same with _id column in mongodb

  // @IsEmpty()
  // @PrimaryGeneratedColumn('uuid')
  // userId!: ObjectID;

  @IsString()
  @IsNotEmpty()
  @Column()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Index({ unique: true })
  @Column()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @Column()
  email: string;

  @IsEmpty()
  @Column({
    default: true,
    name: "firsttime_login_remaining",
    nullable: true
  })
  firstTimeLoginRemaining: boolean;

  @IsEmpty()
  @Column({
    default: true,
    nullable: true
  })
  enabled: boolean;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;
}
