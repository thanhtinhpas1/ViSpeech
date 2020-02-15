import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEmpty,
} from "class-validator";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
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
  @PrimaryGeneratedColumn('uuid', {
    name: 'id'
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: 'first_name'
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: 'last_name'
  })
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

  @CreateDateColumn({
    name: 'created_date'
  })
  created: string;

  @UpdateDateColumn({
    name: 'updated_date'
  })
  updated: string;
}
