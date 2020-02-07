import { IsString, IsEmail, IsBoolean, IsNotEmpty, IsEmpty, IsNumber, Allow } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique, ObjectIdColumn } from 'typeorm';

export class UserIdRequestParamsDto {
  @IsString()
  readonly userId!: number;
}

@Entity("users")
export class UserDto {

  @IsEmpty()
  @PrimaryGeneratedColumn('increment')
  userId!: number;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: "first_name",
    length: 50,
  })
  firstName!: string;

  @IsString()
  @IsNotEmpty() 
  @Column({
    name: "last_name",
    length: 50,
  })
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    length: 50,
  })
  username!: string;

  @IsString()
  @IsNotEmpty()
  @Column({
  })
  password!: string;
  

  @IsEmail()
  @IsNotEmpty()
  @Column({
    length: 50,
  })
  email!: string;

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

}